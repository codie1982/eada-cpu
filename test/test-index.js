const eada = require('../build/Release/eada.node');

console.log("✅ FAISS Node.js eklentisi yüklendi!");

// 🔹 Index oluşturma ve veri ekleme
const testData = Array.from({ length: 10 }, () =>
    Array.from({ length: 128 }, () => Math.random())
);

console.log("🛠 Index oluşturuluyor...");
const indexResult = eada.indexKNN(testData);
console.log(indexResult);

// 🔍 KNN Araması
const queryVector = testData[0]; // İlk eklenen vektörü sorgula
const k = 5; // İlk 5 benzer vektörü bul

console.log("🔍 KNN Araması yapılıyor...");
const searchResult = eada.searchKNN(queryVector, k);
console.log("🎯 Arama Sonuçları:", searchResult);

// 📂 Indexi kaydetme
console.log("💾 Index kaydediliyor...");
const saveResult = eada.saveIndex("test_index.bin");
console.log(saveResult);

// 📂 Kaydedilmiş Indexi Yükleme
console.log("📥 Index dosyadan yükleniyor...");
const loadResult = eada.loadIndex("test_index.bin");
console.log(loadResult);

// ✅ Test Tamamlandı!
console.log("🚀 Tüm testler başarıyla tamamlandı!");
