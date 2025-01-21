cmake_minimum_required(VERSION 3.17 FATAL_ERROR)
cmake_policy(SET CMP0091 NEW)
cmake_policy(SET CMP0042 NEW)

# 📌 Proje Adı
project(eada-cpu LANGUAGES CXX)

# 📌 C++ Standardını Ayarla
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 📌 Derleme Tipini Belirle (Varsayılan: Release)
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# 📌 Node.js ve N-API için gerekli başlık dosyalarını ekle
execute_process(
    COMMAND node -p "require('node-addon-api').include"
    OUTPUT_VARIABLE NODE_ADDON_API_DIR
    OUTPUT_STRIP_TRAILING_WHITESPACE
)

execute_process(
    COMMAND node -p "require('node-addon-api').include"
    OUTPUT_VARIABLE NODE_GYP_DIR
    OUTPUT_STRIP_TRAILING_WHITESPACE
)

execute_process(
    COMMAND node -p "require('node-api-headers').include"
    OUTPUT_VARIABLE NODE_API_HEADERS_DIR
    OUTPUT_STRIP_TRAILING_WHITESPACE
)
# **Node.js başlık dosyalarını ekleyelim**
include_directories(${NODE_ADDON_API_DIR})
include_directories(${NODE_GYP_DIR})
include_directories(${NODE_API_HEADERS_DIR})
include_directories(/usr/include/node) # Genel bir konum, değiştirebilirsin
include_directories(${CMAKE_SOURCE_DIR}/node_modules/node-addon-api)
include_directories(${CMAKE_SOURCE_DIR}/src)

# 📌 FAISS Kütüphanesi
set(FAISS_LIB_PATH "/usr/local/lib")
set(FAISS_INCLUDE_PATH "/usr/local/include")

# FAISS Kütüphanesinin var olup olmadığını kontrol et
if(NOT EXISTS "${FAISS_LIB_PATH}/libfaiss.so")
    message(FATAL_ERROR "FAISS kütüphanesi bulunamadı! Lütfen ${FAISS_LIB_PATH} içinde `libfaiss.so` olduğundan emin olun.")
endif()

# 📌 Çıkış (Output) Dizini
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/build/Release)

# 📌 Kaynak Dosyalar
file(GLOB SOURCE_FILES "src/*.cpp" "src/*.h")

# 📌 Shared Library (eada.node) Oluştur
add_library(eada MODULE ${SOURCE_FILES} ${CMAKE_JS_SRC})

# 📌 FAISS Kütüphanesini Bağlama ve RPATH Ayarları
if(WIN32)
    target_link_libraries(eada "${FAISS_LIB_PATH}/faiss.dll")
    set_target_properties(eada PROPERTIES PREFIX "" SUFFIX ".node")
elseif(APPLE)
    target_link_libraries(eada "${FAISS_LIB_PATH}/libfaiss.so")
    set_target_properties(eada PROPERTIES PREFIX "" SUFFIX ".node")
else()
    target_link_libraries(eada "${FAISS_LIB_PATH}/libfaiss.so" "-fopenmp")
    set_target_properties(eada PROPERTIES PREFIX "" SUFFIX ".node")

    # ✅ **Linux için daha sağlam bir RPATH ayarı**
    set_target_properties(eada PROPERTIES
        BUILD_RPATH "\$ORIGIN/../lib"
        INSTALL_RPATH "\$ORIGIN/../lib"
        INSTALL_RPATH_USE_LINK_PATH TRUE
    )
endif()

# 📌 Prebuilds klasörünü otomatik oluştur
install(CODE "file(MAKE_DIRECTORY ${CMAKE_SOURCE_DIR}/prebuilds)")

# 📌 Eklenti dosyasını doğru dizine kur
install(TARGETS eada 
    LIBRARY DESTINATION prebuilds
    RUNTIME DESTINATION prebuilds
)


