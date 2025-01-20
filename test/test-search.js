const eada = require('../build/Release/eada.node');

console.log("✅ FAISS Node.js eklentisi yüklendi!");

// 📥 Kaydedilmiş Index Dosyasını Yükle
console.log("📂 Kaydedilmiş index dosyadan yükleniyor...");
const loadResult = eada.loadIndex("test_index.bin");
console.log(loadResult);

// 🔹 KNN Arama için Rastgele Sorgu Vektörü
const queryVector = Array.from({ length: 128 }, () => Math.random());
const k = 5; // İlk 5 benzer vektörü bul

console.log("🔍 KNN Araması yapılıyor...");
const searchResult = eada.searchKNN(queryVector, k);
console.log("🎯 Arama Sonuçları:", searchResult);

// ✅ Test Tamamlandı!
console.log("🚀 KNN Arama testi başarıyla tamamlandı!");
