cmake_minimum_required(VERSION 3.17 FATAL_ERROR)
cmake_policy(SET CMP0091 NEW)
cmake_policy(SET CMP0042 NEW)

# Project Name
project(eada-cpu LANGUAGES CXX)

# Set C++ Standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set Build Type (Debug or Release)
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Include Node.js Addon API
include_directories(${CMAKE_JS_INC})
include_directories(${CMAKE_SOURCE_DIR}/node_modules/node-addon-api)

# Include Source Directory
include_directories(${CMAKE_SOURCE_DIR}/src)

# FAISS Library Path (Precompiled)
set(FAISS_LIB_PATH "${CMAKE_SOURCE_DIR}/lib")

# Set Output Directory
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/build/Release)

# Source Files
file(GLOB SOURCE_FILES "src/*.cpp" "src/*.h")

# Create Shared Library
add_library(eada MODULE ${SOURCE_FILES} ${CMAKE_JS_SRC})

# Link FAISS Precompiled Library
if(WIN32)
    target_link_libraries(eada "${FAISS_LIB_PATH}/faiss.dll")
    set_target_properties(eada PROPERTIES PREFIX "" SUFFIX ".node")
    elseif(APPLE)
    target_link_libraries(eada "${FAISS_LIB_PATH}/libfaiss.so" "-Wl,-rpath,@loader_path/../lib")
    set_target_properties(eada PROPERTIES PREFIX "" SUFFIX ".node")
    else()
    target_link_libraries(eada "${FAISS_LIB_PATH}/libfaiss.so" "-Wl,-rpath,$ORIGIN/../lib")
    set_target_properties(eada PROPERTIES PREFIX "" SUFFIX ".node")
    endif()