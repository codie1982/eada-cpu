#include "eada.h"
#include <napi.h>
#include <faiss/IndexHNSW.h>
#include <faiss/index_io.h>
#include <vector>
#include <iostream>
#include <chrono>
#include <memory>

// 🔧 FAISS Index Global Pointer (Bellek sızıntısını önlemek için yöneteceğiz)
std::unique_ptr<faiss::IndexHNSWFlat> faiss_index = nullptr;

// 🔧 HNSW Parametreleri
constexpr int D = 128; // Vektör boyutu
constexpr int M = 32;  // HNSW için bağlantı sayısı
constexpr int EFS = 50;  // efSearch
constexpr int efConstruction = 200; // HNSW yapılandırma parametresi

// 🔍 Fonksiyon Prototipleri
Napi::Value SearchKNN(const Napi::CallbackInfo& info);
Napi::Value LoadIndex(const Napi::CallbackInfo& info);
Napi::Value SaveIndex(const Napi::CallbackInfo& info);
Napi::Value IndexKNN(const Napi::CallbackInfo& info);

// 📂 Indexi kaydetme fonksiyonu
Napi::Value SaveIndex(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (!faiss_index) {
        std::cerr << "[HATA] Index kaydedilmeden önce oluşturulmalıdır!" << std::endl;
        return Napi::String::New(env, "❌ Hata: Index oluşturulmamış!");
    }

    std::string filename = (info.Length() > 0 && info[0].IsString())
                               ? info[0].As<Napi::String>().Utf8Value()
                               : "EADA_index_" + std::to_string(
                                                     std::chrono::duration_cast<std::chrono::seconds>(
                                                         std::chrono::system_clock::now().time_since_epoch())
                                                         .count()) +
                                     ".bin";

    try {
        std::cout << "[INFO] Index " << filename << " olarak kaydediliyor..." << std::endl;
        faiss::write_index(faiss_index.get(), filename.c_str());
        return Napi::String::New(env, "✅ Index başarıyla kaydedildi: " + filename);
    } catch (const std::exception &e) {
        std::cerr << "[HATA] Index kaydedilirken hata oluştu: " << e.what() << std::endl;
        return Napi::String::New(env, "❌ Index kaydedilirken hata oluştu: " + std::string(e.what()));
    }
}

// 🛠 Index oluşturma fonksiyonu
Napi::Value IndexKNN(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (!info[0].IsArray()) {
        return Napi::String::New(env, "❌ Geçersiz veri formatı!");
    }

    Napi::Array inputData = info[0].As<Napi::Array>();
    size_t n = inputData.Length();

    if (!faiss_index) {
        faiss_index = std::make_unique<faiss::IndexHNSWFlat>(D, M);
        faiss_index->hnsw.efSearch = EFS;
        faiss_index->hnsw.efConstruction = efConstruction;
    }

    std::vector<float> dataset(n * D);
    for (size_t i = 0; i < n; i++) {
        Napi::Array row = inputData.Get(i).As<Napi::Array>();
        for (size_t j = 0; j < D; j++) {
            dataset[i * D + j] = row.Get(j).As<Napi::Number>().FloatValue();
        }
    }

    faiss_index->add(n, dataset.data());

    return Napi::String::New(env, "✅ Veri başarıyla indexe eklendi.");
}

// 📂 Kaydedilmiş Index Dosyasını Yükleme Fonksiyonu
Napi::Value LoadIndex(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (!info[0].IsString()) {
        return Napi::String::New(env, "❌ Hata: Dosya adı belirtilmelidir!");
    }

    std::string filename = info[0].As<Napi::String>().Utf8Value();

    try {
        faiss_index.reset(dynamic_cast<faiss::IndexHNSWFlat *>(faiss::read_index(filename.c_str())));
        return Napi::String::New(env, "✅ Index başarıyla yüklendi.");
    } catch (const std::exception &e) {
        return Napi::String::New(env, "❌ Index yüklenirken hata oluştu: " + std::string(e.what()));
    }
}

// 🔍 KNN Arama Fonksiyonu
Napi::Value SearchKNN(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (!faiss_index) {
        return Napi::String::New(env, "❌ Hata: Index yüklenmeden arama yapılamaz!");
    }

    if (!info[0].IsArray() || !info[1].IsNumber()) {
        return Napi::String::New(env, "❌ Hata: Geçersiz giriş verisi!");
    }

    Napi::Array queryArray = info[0].As<Napi::Array>();
    int k = info[1].As<Napi::Number>().Int32Value();

    if (queryArray.Length() != D) {
        return Napi::String::New(env, "❌ Hata: Sorgu vektörü boyutu uyuşmuyor!");
    }

    std::vector<float> query(D);
    for (size_t i = 0; i < D; i++) {
        query[i] = queryArray.Get(i).As<Napi::Number>().FloatValue();
    }

    std::vector<float> distances(k);
    std::vector<faiss::idx_t> indices(k);

    faiss_index->search(1, query.data(), k, distances.data(), indices.data());

    Napi::Array results = Napi::Array::New(env, k);
    for (int i = 0; i < k; i++) {
        Napi::Object obj = Napi::Object::New(env);
        obj.Set("id", Napi::Number::New(env, indices[i]));
        obj.Set("distance", Napi::Number::New(env, distances[i]));
        results.Set(i, obj);
    }

    return results;
}

// 🔗 Node.js için fonksiyonları bağla
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("indexKNN", Napi::Function::New(env, IndexKNN));
    exports.Set("searchKNN", Napi::Function::New(env, SearchKNN));
    exports.Set("loadIndex", Napi::Function::New(env, LoadIndex));
    exports.Set("saveIndex", Napi::Function::New(env, SaveIndex));
    return exports;
}

NODE_API_MODULE(EADA, Init)
