# ECOMMERCEE Backend Projesi

## Proje Hakkında

Bu proje, bir e-ticaret uygulamasının backend kısmını oluşturmak amacıyla geliştirilmiştir. Projenin temel amacı, kullanıcıların ürün ekleyebileceği, mağaza açabileceği, ürün incelemeleri yazabileceği ve kullanıcı yönetimi yapabileceği bir platform sağlamaktır. Bu projeyi yaparken Node.js ve Supabase gibi teknolojileri kullanarak modern bir backend yapısı oluşturmayı hedefledik.

## Neden Bu Projeyi Yaptık?

Bu projeyi gerçekleştirmemizin birkaç ana nedeni bulunmaktadır:

1. **E-Ticaret Çözümleri**: E-ticaret sektöründe yer almak ve bu sektörde ihtiyaç duyulan temel özellikleri öğrenmek.
2. **Backend Geliştirme**: Node.js ve Supabase kullanarak backend geliştirme pratiği yapmak ve bu teknolojileri daha iyi anlamak.
3. **API Yönetimi**: Restful API'lar oluşturarak veri yönetimi ve kullanıcı işlemlerini gerçekleştirmek.

## Nasıl Yapıldığını Biliyoruz

Projeyi oluştururken izlediğimiz adımlar ve kullandığımız yöntemler şu şekildedir:

1. **Proje Yapısının Oluşturulması**: Proje dosya ve klasör yapısını oluşturduk. Bu yapı, backend fonksiyonlarının ve middleware'lerin düzenli bir şekilde yönetilmesini sağlar.
2. **Node.js ve Supabase Entegrasyonu**: Projenin ana veri tabanı yönetim sistemi olarak Supabase'i kullanarak Node.js ile entegre ettik.

3. **Middleware ve API Geliştirme**: Kullanıcı doğrulama, veri yükleme ve yönetim işlemleri için gerekli middleware ve API'ları geliştirdik. Multer kullanarak dosya yükleme işlemlerini gerçekleştirdik.

4. **Veri Yönetimi**: Ürünler, mağazalar, kullanıcılar ve incelemeler gibi temel veri modellerini oluşturduk ve bunları Supabase üzerinde yönettik.

5. **Hata Yönetimi ve Loglama**: Hataları yakalamak ve bunları yönetmek için uygun hata yönetimi mekanizmalarını kurduk. Ayrıca, loglama işlemleri için uygun araçlar kullanarak hata ve işlem kayıtlarını tuttuk.

## Kullanılan Teknolojiler

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Node.js için hızlı, minimalist web framework.
- **Supabase**: Açık kaynaklı Firebase alternatifi.
- **Multer**: Node.js için middleware, çok parçalı/form veri (multipart/form-data) işlemleri için kullanılır.
- **JWT (JSON Web Tokens)**: Kullanıcı kimlik doğrulama işlemleri için.

## Nasıl Çalıştırılır?

1. **Bağımlılıkları Yükleyin**:

   ```bash
   npm install
   ```

2. **Çevresel Değişkenleri Ayarlayın**:
   `.env` dosyasına gerekli Supabase URL ve anahtar bilgilerini girin:

   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   JWT_KEY=your-jwt-key
   ```

3. **Proje Başlatın**:

   ```bash
   npm start
   ```

4. **API'ları Kullanarak İşlemler Yapın**:
   Postman veya benzeri araçlarla API'ları test edebilir ve işlemlerinizi gerçekleştirebilirsiniz.

## Sonuç

Bu proje, e-ticaret uygulamaları geliştirme konusunda önemli deneyimler kazandırdı. Node.js ve Supabase entegrasyonu sayesinde modern ve etkili bir backend altyapısı oluşturmayı başardık. Proje süresince edindiğimiz bilgiler ve beceriler, gelecekteki projelerimizde de bize rehberlik edecektir.
