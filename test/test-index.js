const eada = require('../build/Release/eada.node');
const fs = require('fs');

test('FAISS Index should be created, saved, and loaded', async () => {
    console.log("✅ FAISS Node.js eklentisi yüklendi!");

    const testData = Array.from({ length: 10 }, () =>
        Array.from({ length: 128 }, () => Math.random())
    );

    console.log("🛠 Index oluşturuluyor...");
    const indexResult = eada.indexKNN(testData);
    console.log(indexResult);

    expect(indexResult).toContain("✅");

    // 📂 Indexi kaydet
    console.log("💾 Index kaydediliyor...");
    const filename = "test_index.bin";
    const saveResult = eada.saveIndex(filename);
    console.log(saveResult);

    expect(saveResult).toContain("✅");

    // 📌 Dosyanın oluşturulmasını bekle (2 saniye)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 📂 Indexi tekrar yükle
    console.log("📥 Index dosyadan yükleniyor...");
    const loadResult = eada.loadIndex(filename);
    console.log(loadResult);

    expect(loadResult).toContain("✅");

    // 📌 Dosyanın var olup olmadığını doğrula
    expect(fs.existsSync(filename)).toBe(true);

    console.log("🚀 Index oluşturma testi başarıyla tamamlandı!");
});
