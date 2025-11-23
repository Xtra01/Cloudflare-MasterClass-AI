
import { Category, GeneratedContent } from './types';

export const CLOUDFLARE_CURRICULUM: Category[] = [
  {
    id: 'fundamentals',
    title: 'Core & Networking',
    topics: [
      { id: 'dns-setup', title: 'DNS Mimarisi ve Yönetimi', description: 'NS kayıtları, DNSSEC, CNAME Flattening ve Proxy modları.', level: 'Beginner' },
      { id: 'cdn-cache', title: 'CDN ve Advanced Caching', description: 'Cache Rules, Tiered Cache, Cache Reserve ve Purge stratejileri.', level: 'Intermediate' },
      { id: 'ssl-tls', title: 'SSL/TLS ve Edge Certificates', description: 'Strict SSL, Custom Certificates, mTLS ve Keyless SSL.', level: 'Intermediate' },
      { id: 'load-balancing', title: 'Load Balancing', description: 'Global trafik dağıtımı, Health Checks ve Failover senaryoları.', level: 'Advanced' },
    ]
  },
  {
    id: 'security',
    title: 'Application Security (WAF)',
    topics: [
      { id: 'waf-rules', title: 'WAF Custom Rules', description: 'Karmaşık güvenlik duvarı kuralları ve RegEx kullanımı.', level: 'Intermediate' },
      { id: 'ddos-protection', title: 'Advanced DDoS Protection', description: 'L7 saldırı analizi, Rate Limiting kuralları.', level: 'Advanced' },
      { id: 'bot-management', title: 'Super Bot Fight Mode', description: 'Bot skorlama, Machine Learning tabanlı analiz.', level: 'Expert' },
      { id: 'turnstile', title: 'Turnstile (CAPTCHA Alternative)', description: 'Kullanıcı dostu doğrulama entegrasyonu.', level: 'Intermediate' },
      { id: 'page-shield', title: 'Page Shield', description: 'İstemci tarafı (Client-side) güvenlik ve script izleme.', level: 'Expert' },
    ]
  },
  {
    id: 'developer-platform',
    title: 'Developer Platform (Workers)',
    topics: [
      { id: 'workers-intro', title: 'Workers Temelleri', description: 'V8 Isolate yapısı, Fetch API ve Wrangler CLI.', level: 'Intermediate' },
      { id: 'workers-advanced', title: 'Advanced Workers Patterns', description: 'Service Bindings, Cron Triggers ve Modüler yapı.', level: 'Expert' },
      { id: 'durable-objects', title: 'Durable Objects & Websockets', description: 'Stateful serverless ve gerçek zamanlı uygulamalar.', level: 'Expert' },
      { id: 'workers-queues', title: 'Queues & Asynchronous Processing', description: 'Arka plan işleri ve mesaj kuyrukları.', level: 'Advanced' },
      { id: 'pages-functions', title: 'Cloudflare Pages & Functions', description: 'Full-stack Jamstack uygulamaları dağıtımı.', level: 'Intermediate' },
    ]
  },
  {
    id: 'data-storage',
    title: 'Data & Storage',
    topics: [
      { id: 'r2-storage', title: 'R2 Object Storage', description: 'S3 uyumlu depolama, presigned URLler ve eventler.', level: 'Advanced' },
      { id: 'd1-sql', title: 'D1 SQL Database', description: 'Edge SQL veritabanı, transactionlar ve Time Travel.', level: 'Expert' },
      { id: 'kv-storage', title: 'Workers KV', description: 'Düşük gecikmeli, yüksek okuma hızlı Key-Value deposu.', level: 'Intermediate' },
      { id: 'hyperdrive', title: 'Hyperdrive', description: 'Mevcut veritabanlarını global hale getirme.', level: 'Expert' },
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & Vectorize',
    topics: [
      { id: 'workers-ai', title: 'Workers AI', description: 'Edge üzerinde LLM (Llama, Mistral) çalıştırma.', level: 'Advanced' },
      { id: 'vectorize', title: 'Vectorize (Vector DB)', description: 'Embeddings saklama ve semantik arama yapma.', level: 'Expert' },
      { id: 'ai-gateway', title: 'AI Gateway', description: 'OpenAI/Anthropic proxy, caching ve loglama.', level: 'Intermediate' },
    ]
  },
  {
    id: 'media',
    title: 'Media Services',
    topics: [
      { id: 'stream', title: 'Cloudflare Stream', description: 'Serverless video hosting ve adaptif bitrate streaming.', level: 'Advanced' },
      { id: 'images', title: 'Cloudflare Images', description: 'Görsel optimizasyonu, boyutlandırma ve depolama.', level: 'Intermediate' },
    ]
  },
  {
    id: 'zero-trust',
    title: 'Zero Trust & SASE',
    topics: [
      { id: 'ztna-access', title: 'Access & IdP Integration', description: 'Google/Okta/Azure AD ile kimlik doğrulama.', level: 'Advanced' },
      { id: 'gateway-dns', title: 'Gateway DNS & HTTP Policies', description: 'Kurumsal internet trafiği filtreleme.', level: 'Expert' },
      { id: 'cloudflared', title: 'Cloudflare Tunnel (cloudflared)', description: 'Public IP olmadan özel ağları dışarı açma.', level: 'Advanced' },
      { id: 'warp', title: 'WARP Client & Device Posture', description: 'Cihaz güvenliği kontrolü ve VPN entegrasyonu.', level: 'Expert' },
    ]
  },
  {
    id: 'automation',
    title: 'Automation & IaC',
    topics: [
      { id: 'terraform', title: 'Terraform ile Cloudflare', description: 'Altyapıyı kod olarak yönetme (IaC).', level: 'Expert' },
      { id: 'api-management', title: 'Cloudflare API', description: 'API token yönetimi ve otomasyon scriptleri.', level: 'Advanced' },
    ]
  }
];

// Pre-baked static content for instant loading (Simulated Cache)
export const STATIC_TUTORIALS: Record<string, GeneratedContent> = {
  // --- CORE & NETWORKING ---
  'dns-setup': {
    title: "DNS Mimarisi ve Yönetimi",
    content: `
# Cloudflare DNS Mimarisi

Cloudflare, dünyanın en hızlı ve en güvenilir yönetilen DNS hizmetlerinden birini sunar. Geleneksel DNS'in aksine, Cloudflare bir "Reverse Proxy" olarak çalışır.

### Yönetici Özeti
DNS (Domain Name System), internetin telefon rehberidir. Cloudflare DNS, sitenizin IP adresini gizleyerek (Masking) hem hız hem de güvenlik (DDoS koruması) sağlar.

## Nasıl Çalışır? (Teknik Detay)

Cloudflare DNS iki modda çalışır:
1.  **DNS-Only (Gri Bulut):** Cloudflare sadece DNS çözümler. Trafik doğrudan sunucunuza gider. Koruma veya CDN yok.
2.  **Proxied (Turuncu Bulut):** Trafik Cloudflare Edge sunucularına yönlendirilir. WAF, CDN ve SSL burada devreye girer.

\`\`\`bash
# Örnek bir Dig sorgusu
dig +short site.com
# Proxied IP'ler döner (Cloudflare IP'leri)
104.21.x.x
172.67.x.x
\`\`\`

## CNAME Flattening

Normalde bir Root domain (ornek.com), CNAME kaydı olamaz (RFC standartları gereği). Cloudflare, **CNAME Flattening** teknolojisi ile Root domaininize bir CNAME eklemenize izin verir ve bunu arka planda A kayıtlarına "düzleştirir" (flatten).

> **MasterClass Pro Tip:** Kurumsal yapılarda "Partial CNAME Setup" (Partner Setup) kullanarak, NS kayıtlarını Cloudflare'e taşımadan sadece belirli subdomainleri (örn: www.sirket.com) Cloudflare korumasına alabilirsiniz. Bu Enterprise planlarda yaygındır.
    `,
    relatedTopics: ["CNAME Flattening vs Partial Setup", "DNSSEC Konfigürasyonu", "Secondary DNS nedir?"]
  },
  'cdn-cache': {
    title: "CDN ve Advanced Caching",
    content: `
# CDN ve Önbellekleme Stratejileri

Cloudflare'in kalbi, global Anycast ağıdır. İçeriğinizi statik olarak kenar (Edge) sunucularda tutarak kaynak sunucu yükünü azaltır.

## Cache Rules (Cache Kuralları)

Page Rules artık "Legacy" kabul edilmektedir. Modern yaklaşım **Cache Rules** kullanmaktır.

### Yapılandırma Örneği
Eğer dinamik bir API'niz varsa ama yanıtlar sık değişmiyorsa:

1.  **Field:** \`Hostname\` eq \`api.mysite.com\` AND \`URL Path\` starts with \`/public/v1\`
2.  **Cache Eligibility:** Eligible for cache
3.  **Edge TTL:** Ignore origin cache control, Override to 1 Hour.

## Tiered Cache ve Cache Reserve

*   **Tiered Cache:** Cloudflare veri merkezleri arasında bir hiyerarşi oluşturur. İstek, kaynak sunucuya gitmeden önce üst katman (Upper Tier) veri merkezlerine sorulur. Bant genişliği tasarrufu sağlar.
*   **Cache Reserve:** İçeriğinizi R2 (Object Storage) üzerinde süresiz olarak saklar. "Long-tail" (seyrek erişilen) içerikler için cache'den silinmeyi (eviction) engeller.

> **Pro Tip:** \`Cache-Control: private\` başlığı dönen yanıtlar Cloudflare tarafından varsayılan olarak önbelleğe ALINMAZ. Bunu aşmak için Cache Rules kullanmalısınız.
    `,
    relatedTopics: ["Cache-Control Headers", "Purge by Tag", "Origin Cache Control"]
  },
  'ssl-tls': {
    title: "SSL/TLS ve Edge Certificates",
    content: `
# SSL/TLS Modları ve Güvenlik

Cloudflare, trafiği şifrelemek için esnek SSL seçenekleri sunar. Yanlış yapılandırma "Redirect Loop" hatalarına neden olabilir.

## SSL Modları

1.  **Off (Güvenli Değil):** Önerilmez.
2.  **Flexible:** Ziyaretçi <-> Cloudflare arası şifreli (HTTPS), Cloudflare <-> Sunucu arası şifresiz (HTTP). *Tehlikelidir.*
3.  **Full:** İki taraf da şifreli, ancak sunucudaki sertifika geçersiz (self-signed) olabilir.
4.  **Full (Strict):** **Önerilen.** Sunucuda geçerli bir sertifika (Lets Encrypt veya Cloudflare Origin CA) olmalıdır.

## Edge Certificates

Cloudflare, siteniz için otomatik olarak ücretsiz sertifikalar üretir. Enterprise planlarda **Custom Certificates** yükleyebilir veya **Keyless SSL** (sertifika özel anahtarını kendi HSM'inizde tutma) kullanabilirsiniz.

\`\`\`nginx
# Origin Server Nginx Config (Full Strict için)
server {
    listen 443 ssl;
    ssl_certificate /etc/ssl/origin-cert.pem; # Cloudflare Origin CA
    ssl_certificate_key /etc/ssl/origin-key.key;
}
\`\`\`
    `,
    relatedTopics: ["HSTS Preload", "TLS 1.3 0-RTT", "mTLS (Mutual TLS)"]
  },
  'load-balancing': {
    title: "Global Load Balancing",
    content: `
# Cloudflare Load Balancer

Traffic Manager veya GSLB (Global Server Load Balancing) olarak da bilinir. Trafiği birden fazla sunucu veya veri merkezi arasında dağıtır.

## Bileşenler

1.  **Monitors:** Sunucularınızın sağlığını kontrol eder (Health Check). Örn: \`GET /health\` -> 200 OK.
2.  **Pools:** Sunucu grupları (örn: US-East, EU-West).
3.  **Origins:** Gerçek sunucu IP adresleri.

## Yönlendirme Algoritmaları

*   **Geo-steering:** Kullanıcıyı en yakın veri merkezine yönlendirir (örn: Almanya'dan gelen istek Frankfurt sunucusuna).
*   **Random:** Yükü rastgele dağıtır.
*   **Least Connections:** En az bağlantıya sahip sunucuya gönderir (Tunnel gerektirir).

> **Pro Tip:** Load Balancer sadece "Failover" için değil, bakım çalışmaları sırasında trafiği kesintisiz (Zero Downtime) diğer veri merkezine kaydırmak için de mükemmeldir.
    `,
    relatedTopics: ["Session Affinity", "Health Checks", "Traffic Steering"]
  },

  // --- SECURITY ---
  'waf-rules': {
    title: "WAF Custom Rules (Güvenlik Duvarı)",
    content: `
# Web Application Firewall (WAF)

Cloudflare WAF, OSI Katman 7'de çalışır ve kötü niyetli istekleri sunucunuza ulaşmadan engeller.

## Custom Rules (Eski adıyla Firewall Rules)

Wireshark syntax'ına benzer bir yapı kullanır.

### Örnek Senaryolar

1.  **Belirli Bir Ülkeyi Engelleme (Admin Paneli):**
    \`(http.request.uri.path contains "/admin") and (ip.geoip.country ne "TR")\`
    *Action: Block*

2.  **SQL Injection Koruması (Score Based):**
    \`cf.waf.score < 20\`
    *Action: Managed Challenge*

3.  **Boş User-Agent Engelleme:**
    \`http.user_agent eq ""\`
    *Action: Block*

> **Expert Tip:** "Block" yerine genellikle "Managed Challenge" kullanın. Bu, gerçek kullanıcıları (yanlış pozitif) tamamen engellemek yerine onlara bir doğrulama sunar.
    `,
    relatedTopics: ["WAF Attack Score", "Rate Limiting", "Payload Logging"]
  },
  'ddos-protection': {
    title: "Advanced DDoS Protection",
    content: `
# DDoS Koruması

Cloudflare, 200 Tbps üzeri ağ kapasitesi ile dünyanın en büyük DDoS koruma ağıdır.

## Katmanlar
*   **L3/L4 (Network/Transport):** UDP Flood, SYN Flood, NTP Amplification. Cloudflare bunu varsayılan olarak tüm planlarda engeller ("Unmetered").
*   **L7 (Application):** HTTP Flood. Gerçek kullanıcı gibi görünen bot saldırıları.

## Rate Limiting (Hız Sınırlama)

Bir IP adresinden gelen istek sayısını sınırlar.
*   *Kural:* 10 saniyede aynı IP'den "/login" endpointine 5'ten fazla istek gelirse.
*   *Aksiyon:* 1 saat boyunca engelle.

\`\`\`json
// Rate Limiting Kuralı Mantığı
{
  "match": {
    "request": { "url": "*example.com/login*", "method": "POST" }
  },
  "threshold": 5,
  "period": 10,
  "action": "block"
}
\`\`\`
    `,
    relatedTopics: ["Advanced Rate Limiting", "L7 DDoS Rules", "Spectrum"]
  },
  'bot-management': {
    title: "Super Bot Fight Mode & Bot Management",
    content: `
# Bot Yönetimi

İnternet trafiğinin %40'ı botlardan oluşur. Cloudflare, botları üç kategoriye ayırır:
1.  **Verified Bots:** Googlebot, Bingbot (İzin verilir).
2.  **Likely Automated:** Basit scriptler, curl, python requests.
3.  **Automated (Sophisticated):** Headless Chrome, Puppeteer gibi insan taklidi yapanlar.

## Bot Score (Enterprise)
Her isteğe 1 ile 99 arasında bir skor verilir.
*   **1:** Kesinlikle Bot.
*   **99:** Kesinlikle İnsan.
*   **< 30:** Şüpheli.

WAF kuralı yazarak \`cf.bot_management.score < 30\` olanları "Interactive Challenge" ile karşılayabilirsiniz.

> **Pro Tip:** "Super Bot Fight Mode" (Pro/Biz planları), JS Challenge (Javscript) kullanarak basit botları eler ancak Enterprise Bot Management gibi "Davranışsal Analiz" (Behavioral Analysis) yapmaz.
    `,
    relatedTopics: ["Verified Bot List", "JA3 Fingerprinting", "Machine Learning"]
  },
  'turnstile': {
    title: "Turnstile (CAPTCHA Alternative)",
    content: `
# Turnstile: Akıllı CAPTCHA Alternatifi

Kullanıcılara trafik ışığı veya yaya geçidi seçtirmek yerine, tarayıcı ortamını analiz ederek (Proof of Work) doğrulama yapar.

## Entegrasyon

HTML formunuza basit bir script ve div ekleyerek çalıştırırsınız.

\`\`\`html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

<form action="/login" method="POST">
  <div class="cf-turnstile" data-sitekey="SITE_KEY_BURAYA"></div>
  <button type="submit">Giriş</button>
</form>
\`\`\`

Arka uçta (Backend), Cloudflare API'sine token'ı doğrulamanız gerekir:
\`POST https://challenges.cloudflare.com/turnstile/v0/siteverify\`

Turnstile, gizlilik odaklıdır (Privacy Pass protokolünü kullanır) ve çerezlere bağımlı değildir.
    `,
    relatedTopics: ["Invisible Challenge", "Privacy Pass", "Managed Challenge"]
  },
  'page-shield': {
    title: "Page Shield (Client-side Security)",
    content: `
# Page Shield

Sadece sunucuyu korumak yetmez. Kullanıcının tarayıcısında çalışan JavaScript kodları da (Magecart saldırıları gibi) tehdit altındadır.

## Ne Yapar?
Sitenizde çalışan **tüm** JavaScript dosyalarını izler. Eğer 3. parti bir kütüphane (örn: analytics.js veya chat widget) aniden kötü amaçlı kod barındırmaya başlarsa sizi uyarır.

*   **Script Monitor:** Yeni yüklenen scriptleri raporlar.
*   **Malicious Code Detection:** Bilinen zararlı imzaları tarar.
*   **CSP (Content Security Policy) Yönetimi:** Hangi domainlerden script yüklenebileceğini kısıtlar.

> **Expert Tip:** Page Shield, "Supply Chain Attack" (Tedarik Zinciri Saldırıları) için kritik bir önlemdir.
    `,
    relatedTopics: ["Content Security Policy", "Magecart Attacks", "Script Integrity"]
  },

  // --- DEVELOPER PLATFORM ---
  'workers-intro': {
    title: "Workers Temelleri",
    content: `
# Cloudflare Workers: Serverless'ın Geleceği

Workers, Cloudflare'in V8 motoru üzerinde çalışan, soğuk başlatma (cold start) süresi neredeyse sıfır (0ms) olan serverless platformudur.

### Mimari ve Çalışma Prensibi
Geleneksel "Container" veya "VM" tabanlı Lambda fonksiyonlarının aksine, Workers **Isolates** teknolojisini kullanır. Tek bir işlem (process) içinde binlerce izole ortam çalışır.

\`\`\`javascript
// Temel bir Worker Yapısı (ES Modules)
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === "/merhaba") {
      return new Response("Merhaba Dünya! Edge'den selamlar.", {
        headers: { "content-type": "text/plain;charset=UTF-8" }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
\`\`\`

## Wrangler CLI

Workers projelerini yönetmek için \`npm install -g wrangler\` kullanın.
*   \`wrangler dev\`: Local test.
*   \`wrangler deploy\`: Global deploy (< 1 sn).
    `,
    relatedTopics: ["V8 Isolates", "Edge Runtime", "Wrangler.toml"]
  },
  'workers-advanced': {
    title: "Advanced Workers Patterns",
    content: `
# İleri Seviye Workers

Basit yönlendirmelerin ötesine geçin.

## Service Bindings
Bir Worker'ın diğer bir Worker'ı, HTTP gecikmesi olmadan (internal function call gibi) çağırmasını sağlar. Mikroservis mimarisi için idealdir.

\`\`\`javascript
// Gateway Worker
export default {
  async fetch(req, env) {
    // Auth Worker'ını çağır
    const authRes = await env.AUTH_SERVICE.fetch(req.clone());
    if (authRes.status !== 200) return authRes;
    
    // İşlem Worker'ını çağır
    return env.APP_SERVICE.fetch(req);
  }
}
\`\`\`

## Cron Triggers
Worker'ları zamanlanmış görevler (Scheduled Events) olarak çalıştırabilirsiniz. \`wrangler.toml\` dosyasında tanımlanır:

\`\`\`toml
[triggers]
crons = ["*/30 * * * *"] # Her 30 dakikada bir
\`\`\`
    `,
    relatedTopics: ["Service Bindings", "Cron Triggers", "Module Workers"]
  },
  'durable-objects': {
    title: "Durable Objects & Websockets",
    content: `
# Durable Objects (DO)

Workers normalde "Stateless"dır (durumsuz). Durable Objects, Workers'a "State" (durum) ve "Consistency" (tutarlılık) kazandırır.

## Kullanım Alanları
*   Gerçek zamanlı sohbet uygulamaları (WebSockets).
*   Online oyun sunucuları (Game state).
*   Collaborative editing (Google Docs benzeri).

Her Durable Object instance'ı dünyada **tek bir noktada** yaşar ve benzersiz bir ID'ye sahiptir. O ID'ye giden tüm istekler sıraya konur, böylece "Race Condition" oluşmaz.

\`\`\`javascript
export class ChatRoom {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    // WebSocket upgrade işlemi ve mesajlaşma mantığı
    let count = await this.state.storage.get("count") || 0;
    count++;
    await this.state.storage.put("count", count);
    return new Response(count);
  }
}
\`\`\`
    `,
    relatedTopics: ["WebSockets in Workers", "Strong Consistency", "Global State"]
  },
  'workers-queues': {
    title: "Queues & Asynchronous Processing",
    content: `
# Cloudflare Queues

Uygulamanızın yanıt süresini düşürmek için ağır işleri arka plana atın. Producer-Consumer modelini kullanır.

## Nasıl Çalışır?
1.  **Producer Worker:** İsteği alır, veriyi Queue'ya atar (\`env.MY_QUEUE.send(data)\`) ve kullanıcıya hemen yanıt döner ("İşlem alındı").
2.  **Consumer Worker:** Arka planda Queue'dan mesajları toplu (batch) olarak çeker ve işler (örn: Veritabanına yazma, mail atma).

\`\`\`javascript
// Producer
export default {
  async fetch(req, env) {
    await env.EMAIL_QUEUE.send({ to: "user@ex.com", body: "Welcome" });
    return new Response("Queued");
  }
}

// Consumer
export default {
  async queue(batch, env) {
    for (const message of batch.messages) {
      await sendEmail(message.body);
    }
  }
}
\`\`\`
    `,
    relatedTopics: ["Message Buffering", "Batch Processing", "Async Patterns"]
  },
  'pages-functions': {
    title: "Cloudflare Pages & Functions",
    content: `
# Cloudflare Pages

Netlify veya Vercel'in Cloudflare versiyonudur. Git (GitHub/GitLab) entegrasyonu ile statik sitelerinizi (React, Vue, Astro) dağıtır.

## Pages Functions
Sadece statik değil, \`/functions\` klasörüne koyduğunuz dosyalar otomatik olarak birer Worker gibi çalışır (Full-stack).

*   \`functions/api/users.js\` -> \`GET /api/users\`

Pages, Workers'a göre daha "Opinionated" (standartlaştırılmış) bir dosya yapısı sunar ve dağıtım süreci otomatiktir.

> **Pro Tip:** "Direct Upload" özelliği ile Git kullanmadan CI/CD pipeline'ınızdan doğrudan derlenmiş dosyaları (assets) yükleyebilirsiniz.
    `,
    relatedTopics: ["Jamstack", "Server Side Rendering (SSR)", "Direct Upload"]
  },

  // --- DATA & STORAGE ---
  'r2-storage': {
    title: "R2 Object Storage",
    content: `
# R2 Object Storage

AWS S3'e rakip, **Egress (Veri Çıkış) Ücreti Olmayan** depolama çözümü.

## Neden R2?
AWS S3'te veriyi koymak ucuz, dışarı çıkarmak pahalıdır. R2'de bant genişliği ücreti yoktur, sadece depolama ve işlem ücreti vardır.

## Kullanım
S3 API uyumludur. Mevcut AWS SDK'larını kullanabilirsiniz.

\`\`\`javascript
// Worker içinden R2 kullanımı
const object = await env.MY_BUCKET.get("image.png");

if (object === null) {
  return new Response("Object Not Found", { status: 404 });
}

return new Response(object.body);
\`\`\`

Ayrıca "Event Notifications" ile R2'ye dosya yüklendiğinde bir Worker (Queue) tetikleyebilirsiniz.
    `,
    relatedTopics: ["S3 Compatibility", "Zero Egress Fees", "Presigned URLs"]
  },
  'd1-sql': {
    title: "D1 SQL Database",
    content: `
# D1: Serverless SQL

Cloudflare'in SQLite tabanlı, global olarak dağıtık ilişkisel veritabanı.

## Özellikler
*   Workers ile tam entegre.
*   JSON yerine SQL sorguları.
*   **Time Travel:** Veritabanınızı tek komutla geçmiş bir zamana (örn: 1 saat önceye) geri döndürebilirsiniz.

\`\`\`javascript
// Worker içinde sorgu
const { results } = await env.DB.prepare(
  "SELECT * FROM users WHERE id = ?"
)
.bind(123)
.all();

return Response.json(results);
\`\`\`
    `,
    relatedTopics: ["SQLite at Edge", "Time Travel Restore", "Migrations"]
  },
  'kv-storage': {
    title: "Workers KV",
    content: `
# Workers KV (Key-Value)

Global, düşük gecikmeli (low-latency) veri deposu. **Yazma işlemi yavaş (sn'ler sürebilir), okuma işlemi çok hızlıdır (ms'ler).**

## Ne için kullanılır?
*   Konfigürasyon dosyaları.
*   Kullanıcı oturumları (Session).
*   Çeviri dosyaları (i18n).
*   Statik HTML cache.

\`\`\`javascript
// Veri Yazma
await env.NAMESPACE.put("key", "value", {expirationTtl: 60});

// Veri Okuma
const value = await env.NAMESPACE.get("key");
\`\`\`

> **Önemli:** KV "Eventual Consistency" modelini kullanır. Bir veri merkezinde yazdığınız veri, diğerine hemen gitmeyebilir (60 saniyeye kadar sürebilir). Anlık tutarlılık gerekiyorsa **Durable Objects** veya **D1** kullanın.
    `,
    relatedTopics: ["Eventual Consistency", "Edge Caching", "KV Limits"]
  },
  'hyperdrive': {
    title: "Hyperdrive",
    content: `
# Hyperdrive

Mevcut merkezi veritabanlarınızı (Postgres, MySQL - AWS RDS, Google Cloud SQL vb.) global hale getiren bir bağlantı havuzu ve önbellek katmanıdır.

## Sorun
Worker Edge'de çalışır (örn: Kullanıcı Almanya'da), veritabanınız ABD'dedir. Her sorguda TCP handshake + SSL + Query süresi (Round Trip Time) çok yüksektir.

## Çözüm (Hyperdrive)
Hyperdrive, Cloudflare ağında veritabanı bağlantılarını açık tutar (Connection Pooling) ve sık yapılan okuma sorgularını (SELECT) Edge'de önbellekler. Bu, veritabanı erişimini 10x hızlandırabilir.
    `,
    relatedTopics: ["Database Latency", "Connection Pooling", "PostgreSQL"]
  },

  // --- AI & VECTORIZE ---
  'workers-ai': {
    title: "Workers AI",
    content: `
# Workers AI

Cloudflare'in GPU ağı üzerinde çalışan Serverless AI platformu. Kendi GPU'nuzu yönetmenize gerek kalmadan Llama 3, Mistral, Stable Diffusion gibi modelleri çalıştırabilirsiniz.

\`\`\`javascript
import { Ai } from '@cloudflare/ai';

export default {
  async fetch(request, env) {
    const ai = new Ai(env.AI);

    const response = await ai.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          { role: 'user', content: 'Bana kuantum fiziğini basitçe anlat.' }
        ]
      }
    );

    return Response.json(response);
  }
};
\`\`\`

Tek satır kodla güçlü yapay zeka modellerine erişim sağlar.
    `,
    relatedTopics: ["Inference at Edge", "Llama Models", "Text Generation"]
  },
  'vectorize': {
    title: "Vectorize (Vector Database)",
    content: `
# Vectorize

Yapay zeka modelleri için "Uzun Süreli Hafıza" (Long Term Memory) veya semantik arama (Semantic Search) altyapısıdır.

## Nasıl Çalışır?
Metinleri (veya resimleri) Workers AI (Embedding Model) kullanarak sayısal vektörlere çevirirsiniz. Bu vektörleri Vectorize'a kaydedersiniz.

Daha sonra kullanıcı "Kırmızı ayakkabı" diye arattığında, kelime eşleşmesi değil, anlam eşleşmesi (Cosine Similarity) yaparak en yakın sonuçları getirir. RAG (Retrieval Augmented Generation) mimarisi için temeldir.
    `,
    relatedTopics: ["Vector Embeddings", "Semantic Search", "RAG Architecture"]
  },
  'ai-gateway': {
    title: "AI Gateway",
    content: `
# AI Gateway

Yapay zeka uygulamalarınızı yönetmek, izlemek ve optimize etmek için bir proxy katmanıdır.

## Özellikler
1.  **Analytics:** Kaç token harcadınız? Hangi model ne kadar kullanıldı?
2.  **Caching:** Aynı soruyu tekrar soran kullanıcılar için API (OpenAI vb.) maliyetini sıfırlar. Yanıtı cache'den döner.
3.  **Rate Limiting:** Kendi kullanıcılarınızın AI kullanımını sınırlayın.
4.  **Loglama:** Tüm prompt ve response'ları kaydedin.

Sadece Workers AI için değil, OpenAI, Anthropic, Google Gemini gibi dış sağlayıcılar için de çalışır.
    `,
    relatedTopics: ["Cost Management", "AI Observability", "Prompt Caching"]
  },

  // --- MEDIA ---
  'stream': {
    title: "Cloudflare Stream",
    content: `
# Cloudflare Stream

YouTube'un altyapısı gibi düşünebilirsiniz, ancak sizin kontrolünüzde. Video yükleme, kodlama (encoding), depolama ve oynatma (player) hizmeti sunar.

## Özellikler
*   **Adaptive Bitrate Streaming (ABR):** Kullanıcının internet hızına göre kaliteyi (360p, 720p, 4K) otomatik ayarlar.
*   **Signed URLs:** Videoları sadece yetkili kullanıcıların (örn: ücretli üyeler) izlemesini sağlar. Videonun indirilmesini zorlaştırır.
*   **Direct Creator Uploads:** Kullanıcılarınızın videoları kendi sunucunuza yüklemeden, doğrudan Cloudflare'e yüklemesini sağlayan token sistemi.
    `,
    relatedTopics: ["HLS/DASH", "Signed Tokens", "Video Analytics"]
  },
  'images': {
    title: "Cloudflare Images",
    content: `
# Cloudflare Images

Görselleri depolama, boyutlandırma ve optimize etme çözümüdür.

## Özellikler
*   **Automatic Optimization:** WebP veya AVIF formatına otomatik çevirir.
*   **Variants:** Tek bir görsel yükleyip, URL parametreleri ile farklı boyutlarda (avatar, hero, thumbnail) servis edebilirsiniz.
*   **BlurHash:** Görsel yüklenirken gösterilecek bulanık önizleme verisini üretir.

\`\`\`html
<!-- URL üzerinden boyutlandırma -->
<img src="/cdn-cgi/imagedelivery/ACCOUNT_HASH/image_id/thumbnail" />
\`\`\`
    `,
    relatedTopics: ["Image Resizing", "WebP/AVIF", "Image Storage"]
  },

  // --- ZERO TRUST ---
  'ztna-access': {
    title: "Access & IdP Integration",
    content: `
# Cloudflare Access (ZTNA)

VPN'lerin yerini alan Zero Trust Network Access çözümüdür. İç ağınızdaki uygulamalara (Jira, SSH, RDP, Intranet) erişimi, VPN kurmadan, tarayıcı üzerinden güvenli hale getirir.

## Nasıl Çalışır?
Kullanıcı "intranet.sirket.com" adresine gitmek istediğinde, Cloudflare araya girer ve "Önce giriş yap" der.

## IdP (Identity Provider)
Google Workspace, Azure AD, Okta, GitHub gibi kimlik sağlayıcılarla entegre olur. "Sadece @sirket.com maili olanlar ve Azure AD grubunda 'Mühendis' olanlar girebilsin" gibi kurallar yazabilirsiniz.
    `,
    relatedTopics: ["BeyondCorp", "VPN Replacement", "SSO Integration"]
  },
  'gateway-dns': {
    title: "Gateway DNS & HTTP Policies",
    content: `
# Cloudflare Gateway

Kurumsal ağınızdan internete çıkan trafiği filtreler (Secure Web Gateway).

## Özellikler
*   **DNS Filtering:** Şirket bilgisayarlarının "Kumar, Zararlı Yazılım, Phishing" sitelerine girmesini DNS seviyesinde engeller.
*   **HTTP Filtering:** Dosya indirmeyi engelleyebilir, DLP (Data Loss Prevention) ile kredi kartı numaralarının dışarı sızmasını önleyebilir.
*   **Browser Isolation:** Şüpheli siteleri (veya tüm siteleri) Cloudflare sunucularında çalışan sanal bir tarayıcıda açar (Pixel Streaming). Kullanıcının bilgisayarına asla zararlı kod inmez.
    `,
    relatedTopics: ["Secure Web Gateway", "Remote Browser Isolation", "DNS Policies"]
  },
  'cloudflared': {
    title: "Cloudflare Tunnel (cloudflared)",
    content: `
# Cloudflare Tunnel

İç ağınızdaki (NAT arkasındaki) sunucuları, **Port açmadan (Port Forwarding yok)** ve Public IP kullanmadan internete açar.

## Nasıl Çalışır?
Sunucunuza \`cloudflared\` ajanını kurarsınız. Bu ajan, Cloudflare Edge'e şifreli bir tünel (outbound connection) açar. Dışarıdan gelen istek bu tünelden sunucuya ulaşır.

Bu sayede güvenlik duvarınızda **Gelen (Inbound) tüm portları kapatabilirsiniz.** Sadece Cloudflare'e giden (Outbound) trafiğe izin vermeniz yeterlidir.

\`\`\`bash
cloudflared tunnel create my-tunnel
cloudflared tunnel route dns my-tunnel app.example.com
cloudflared tunnel run my-tunnel
\`\`\`
    `,
    relatedTopics: ["Origin Protection", "No Port Forwarding", "Private Networks"]
  },
  'warp': {
    title: "WARP Client & Device Posture",
    content: `
# WARP Client

Çalışanların cihazlarına kurulan VPN uygulamasıdır. Trafiği şifreleyip Cloudflare Gateway'e yönlendirir.

## Device Posture (Cihaz Durumu)
Zero Trust kurallarında sadece "Kimlik" değil, "Cihaz Sağlığı" da kontrol edilebilir.
*   "Antivirüs çalışıyor mu?"
*   "Disk şifreli mi?"
*   "İşletim sistemi güncel mi?"

Eğer cihaz güvensizse, kullanıcı adı/şifresi doğru olsa bile sisteme erişemez.
    `,
    relatedTopics: ["Endpoint Security", "Split Tunneling", "Zero Trust Client"]
  },

  // --- AUTOMATION ---
  'terraform': {
    title: "Terraform ile Cloudflare",
    content: `
# Terraform ile Altyapı Yönetimi (IaC)

Cloudflare konfigürasyonunu (DNS, WAF, Workers) elle yapmak yerine kod olarak (HCL) yönetmenizi sağlar.

\`\`\`hcl
# Örnek: DNS Kaydı Oluşturma
resource "cloudflare_record" "www" {
  zone_id = var.zone_id
  name    = "www"
  value   = "203.0.113.10"
  type    = "A"
  proxied = true
}

# Örnek: Basit bir Firewall Kuralı
resource "cloudflare_filter" "wordpress" {
  zone_id = var.zone_id
  description = "Wordpress Login Protection"
  expression = "(http.request.uri.path contains \"/wp-login.php\")"
}
\`\`\`

Bu sayede değişiklikleri Git üzerinde versiyonlayabilir, "Code Review" yapabilir ve hatalı bir değişikliği anında geri alabilirsiniz.
    `,
    relatedTopics: ["Infrastructure as Code", "Terraform Provider", "GitOps"]
  },
  'api-management': {
    title: "Cloudflare API ve Otomasyon",
    content: `
# Cloudflare API

Dashboard'da yapabildiğiniz her şeyi API ile yapabilirsiniz.

## Token Yönetimi
Eski "Global API Key" yerine, yetkileri kısıtlanmış **API Tokens** kullanın.
*   *Örnek Yetki:* Sadece "example.com" zone'unda "DNS" kayıtlarını "Edit" yetkisi.

## Kullanım Örnekleri
*   Otomatik IP güncelleme (DDNS).
*   SSL sertifikalarını listeleme.
*   Cache temizleme (Deploy sonrası).

\`\`\`bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache" \
     -H "Authorization: Bearer API_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
\`\`\`
    `,
    relatedTopics: ["API Tokens vs Keys", "Rate Limits", "Python SDK"]
  }
};
