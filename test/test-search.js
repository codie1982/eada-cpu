const eada = require('../build/Release/eada.node');
const fs = require('fs');

test('KNN search should return valid results', async () => {
    console.log("✅ FAISS Node.js eklentisi yüklendi!");

    const filename = "test_index.bin";

    // 📌 Eğer dosya yoksa 2 saniye bekle
    if (!fs.existsSync(filename)) {
        console.log("⏳ Index dosyası henüz oluşturulmadı, bekleniyor...");
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log("📂 Kaydedilmiş index dosyadan yükleniyor...");
    const loadResult = eada.loadIndex(filename);
    console.log(loadResult);

    expect(loadResult).toContain("✅");

    const queryVector = Array.from({ length: 128 }, () => Math.random());
    const k = 5;

    console.log("🔍 KNN Araması yapılıyor...");
    const searchResult = eada.searchKNN(queryVector, k);
    console.log("🎯 Arama Sonuçları:", searchResult);

    // ✅ Sonuçların doğru formatta olup olmadığını doğrula
    expect(Array.isArray(searchResult)).toBe(true);
    expect(searchResult.length).toBe(k);
    expect(searchResult[0]).toHaveProperty("id");
    expect(searchResult[0]).toHaveProperty("distance");

    console.log("🚀 KNN Arama testi başarıyla tamamlandı!");
});
