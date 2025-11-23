
import { Category, ContentCache } from './types';

export const CLOUDFLARE_CURRICULUM: Category[] = [
  {
    id: 'fundamentals',
    title: { tr: 'Core & Networking', en: 'Core & Networking' },
    topics: [
      { id: 'dns-setup', title: { tr: 'DNS Mimarisi ve Yönetimi', en: 'DNS Architecture & Management' }, description: { tr: 'NS kayıtları, DNSSEC, CNAME Flattening ve Proxy modları.', en: 'NS records, DNSSEC, CNAME Flattening and Proxy modes.' }, level: 'Beginner' },
      { id: 'cdn-cache', title: { tr: 'CDN ve Advanced Caching', en: 'CDN & Advanced Caching' }, description: { tr: 'Cache Rules, Tiered Cache, Cache Reserve ve Purge stratejileri.', en: 'Cache Rules, Tiered Cache, Cache Reserve and Purge strategies.' }, level: 'Intermediate' },
      { id: 'ssl-tls', title: { tr: 'SSL/TLS ve Edge Certificates', en: 'SSL/TLS & Edge Certificates' }, description: { tr: 'Strict SSL, Custom Certificates, mTLS ve Keyless SSL.', en: 'Strict SSL, Custom Certificates, mTLS and Keyless SSL.' }, level: 'Intermediate' },
      { id: 'load-balancing', title: { tr: 'Load Balancing', en: 'Load Balancing' }, description: { tr: 'Global trafik dağıtımı, Health Checks ve Failover senaryoları.', en: 'Global traffic distribution, Health Checks and Failover scenarios.' }, level: 'Advanced' },
    ]
  },
  {
    id: 'security',
    title: { tr: 'Uygulama Güvenliği (WAF)', en: 'Application Security (WAF)' },
    topics: [
      { id: 'waf-rules', title: { tr: 'WAF Custom Rules', en: 'WAF Custom Rules' }, description: { tr: 'Karmaşık güvenlik duvarı kuralları ve RegEx kullanımı.', en: 'Complex firewall rules and RegEx usage.' }, level: 'Intermediate' },
      { id: 'ddos-protection', title: { tr: 'Advanced DDoS Protection', en: 'Advanced DDoS Protection' }, description: { tr: 'L7 saldırı analizi, Rate Limiting kuralları.', en: 'L7 attack analysis, Rate Limiting rules.' }, level: 'Advanced' },
      { id: 'bot-management', title: { tr: 'Super Bot Fight Mode', en: 'Super Bot Fight Mode' }, description: { tr: 'Bot skorlama, Machine Learning tabanlı analiz.', en: 'Bot scoring, Machine Learning based analysis.' }, level: 'Expert' },
      { id: 'turnstile', title: { tr: 'Turnstile (CAPTCHA Alternative)', en: 'Turnstile (CAPTCHA Alternative)' }, description: { tr: 'Kullanıcı dostu doğrulama entegrasyonu.', en: 'User-friendly challenge integration.' }, level: 'Intermediate' },
      { id: 'page-shield', title: { tr: 'Page Shield', en: 'Page Shield' }, description: { tr: 'İstemci tarafı (Client-side) güvenlik ve script izleme.', en: 'Client-side security and script monitoring.' }, level: 'Expert' },
    ]
  },
  {
    id: 'developer-platform',
    title: { tr: 'Geliştirici Platformu (Workers)', en: 'Developer Platform (Workers)' },
    topics: [
      { id: 'workers-intro', title: { tr: 'Workers Temelleri', en: 'Workers Fundamentals' }, description: { tr: 'V8 Isolate yapısı, Fetch API ve Wrangler CLI.', en: 'V8 Isolate structure, Fetch API and Wrangler CLI.' }, level: 'Intermediate' },
      { id: 'workers-advanced', title: { tr: 'Advanced Workers Patterns', en: 'Advanced Workers Patterns' }, description: { tr: 'Service Bindings, Cron Triggers ve Modüler yapı.', en: 'Service Bindings, Cron Triggers and Modular structure.' }, level: 'Expert' },
      { id: 'durable-objects', title: { tr: 'Durable Objects & Websockets', en: 'Durable Objects & Websockets' }, description: { tr: 'Stateful serverless ve gerçek zamanlı uygulamalar.', en: 'Stateful serverless and real-time applications.' }, level: 'Expert' },
      { id: 'workers-queues', title: { tr: 'Queues & Asynchronous Processing', en: 'Queues & Asynchronous Processing' }, description: { tr: 'Arka plan işleri ve mesaj kuyrukları.', en: 'Background jobs and message queues.' }, level: 'Advanced' },
      { id: 'pages-functions', title: { tr: 'Cloudflare Pages & Functions', en: 'Cloudflare Pages & Functions' }, description: { tr: 'Full-stack Jamstack uygulamaları dağıtımı.', en: 'Full-stack Jamstack application deployment.' }, level: 'Intermediate' },
    ]
  },
  {
    id: 'data-storage',
    title: { tr: 'Veri & Depolama', en: 'Data & Storage' },
    topics: [
      { id: 'r2-storage', title: { tr: 'R2 Object Storage', en: 'R2 Object Storage' }, description: { tr: 'S3 uyumlu depolama, presigned URLler ve eventler.', en: 'S3 compatible storage, presigned URLs and events.' }, level: 'Advanced' },
      { id: 'd1-sql', title: { tr: 'D1 SQL Database', en: 'D1 SQL Database' }, description: { tr: 'Edge SQL veritabanı, transactionlar ve Time Travel.', en: 'Edge SQL database, transactions and Time Travel.' }, level: 'Expert' },
      { id: 'kv-storage', title: { tr: 'Workers KV', en: 'Workers KV' }, description: { tr: 'Düşük gecikmeli, yüksek okuma hızlı Key-Value deposu.', en: 'Low latency, high read throughput Key-Value store.' }, level: 'Intermediate' },
      { id: 'hyperdrive', title: { tr: 'Hyperdrive', en: 'Hyperdrive' }, description: { tr: 'Mevcut veritabanlarını global hale getirme.', en: 'Making existing databases global.' }, level: 'Expert' },
    ]
  },
  {
    id: 'ai-ml',
    title: { tr: 'AI & Vectorize', en: 'AI & Vectorize' },
    topics: [
      { id: 'workers-ai', title: { tr: 'Workers AI', en: 'Workers AI' }, description: { tr: 'Edge üzerinde LLM (Llama, Mistral) çalıştırma.', en: 'Running LLMs (Llama, Mistral) at the Edge.' }, level: 'Advanced' },
      { id: 'vectorize', title: { tr: 'Vectorize (Vector DB)', en: 'Vectorize (Vector DB)' }, description: { tr: 'Embeddings saklama ve semantik arama yapma.', en: 'Storing embeddings and semantic search.' }, level: 'Expert' },
      { id: 'ai-gateway', title: { tr: 'AI Gateway', en: 'AI Gateway' }, description: { tr: 'OpenAI/Anthropic proxy, caching ve loglama.', en: 'OpenAI/Anthropic proxy, caching and logging.' }, level: 'Intermediate' },
    ]
  },
  {
    id: 'media',
    title: { tr: 'Medya Servisleri', en: 'Media Services' },
    topics: [
      { id: 'stream', title: { tr: 'Cloudflare Stream', en: 'Cloudflare Stream' }, description: { tr: 'Serverless video hosting ve adaptif bitrate streaming.', en: 'Serverless video hosting and adaptive bitrate streaming.' }, level: 'Advanced' },
      { id: 'images', title: { tr: 'Cloudflare Images', en: 'Cloudflare Images' }, description: { tr: 'Görsel optimizasyonu, boyutlandırma ve depolama.', en: 'Image optimization, resizing and storage.' }, level: 'Intermediate' },
    ]
  },
  {
    id: 'zero-trust',
    title: { tr: 'Zero Trust & SASE', en: 'Zero Trust & SASE' },
    topics: [
      { id: 'ztna-access', title: { tr: 'Access & IdP Integration', en: 'Access & IdP Integration' }, description: { tr: 'Google/Okta/Azure AD ile kimlik doğrulama.', en: 'Authentication with Google/Okta/Azure AD.' }, level: 'Advanced' },
      { id: 'gateway-dns', title: { tr: 'Gateway DNS & HTTP Policies', en: 'Gateway DNS & HTTP Policies' }, description: { tr: 'Kurumsal internet trafiği filtreleme.', en: 'Corporate internet traffic filtering.' }, level: 'Expert' },
      { id: 'cloudflared', title: { tr: 'Cloudflare Tunnel (cloudflared)', en: 'Cloudflare Tunnel (cloudflared)' }, description: { tr: 'Public IP olmadan özel ağları dışarı açma.', en: 'Exposing private networks without Public IP.' }, level: 'Advanced' },
      { id: 'warp', title: { tr: 'WARP Client & Device Posture', en: 'WARP Client & Device Posture' }, description: { tr: 'Cihaz güvenliği kontrolü ve VPN entegrasyonu.', en: 'Device security check and VPN integration.' }, level: 'Expert' },
    ]
  },
  {
    id: 'automation',
    title: { tr: 'Otomasyon & IaC', en: 'Automation & IaC' },
    topics: [
      { id: 'terraform', title: { tr: 'Terraform ile Cloudflare', en: 'Cloudflare with Terraform' }, description: { tr: 'Altyapıyı kod olarak yönetme (IaC).', en: 'Managing infrastructure as code (IaC).' }, level: 'Expert' },
      { id: 'api-management', title: { tr: 'Cloudflare API', en: 'Cloudflare API' }, description: { tr: 'API token yönetimi ve otomasyon scriptleri.', en: 'API token management and automation scripts.' }, level: 'Advanced' },
    ]
  }
];

// Helper to fill static content
const createStaticEntry = (trTitle: string, trContent: string, trRelated: string[], enTitle: string, enContent: string, enRelated: string[]) => {
  return {
    tr: { title: trTitle, content: trContent, relatedTopics: trRelated, language: 'tr' as const },
    en: { title: enTitle, content: enContent, relatedTopics: enRelated, language: 'en' as const }
  };
};

export const STATIC_TUTORIALS: ContentCache = {
  'dns-setup': createStaticEntry(
    "DNS Mimarisi ve Yönetimi",
    `
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
    ["CNAME Flattening vs Partial Setup", "DNSSEC Konfigürasyonu", "Secondary DNS nedir?"],
    "DNS Architecture & Management",
    `
# Cloudflare DNS Architecture

Cloudflare offers one of the fastest and most reliable managed DNS services in the world. Unlike traditional DNS, Cloudflare operates as a "Reverse Proxy".

### Executive Summary
DNS (Domain Name System) is the phonebook of the internet. Cloudflare DNS masks your site's IP address, providing both speed and security (DDoS protection).

## How It Works (Technical Detail)

Cloudflare DNS operates in two modes:
1.  **DNS-Only (Grey Cloud):** Cloudflare only resolves DNS. Traffic goes directly to your server. No protection or CDN.
2.  **Proxied (Orange Cloud):** Traffic is routed to Cloudflare Edge servers. WAF, CDN, and SSL are activated here.

\`\`\`bash
# Example Dig query
dig +short site.com
# Returns Proxied IPs (Cloudflare IPs)
104.21.x.x
172.67.x.x
\`\`\`

## CNAME Flattening

Normally, a Root domain (example.com) cannot be a CNAME record (per RFC standards). Cloudflare allows you to add a CNAME to your Root domain via **CNAME Flattening** technology, which "flattens" it to A records in the background.

> **MasterClass Pro Tip:** In enterprise setups, you can use "Partial CNAME Setup" (Partner Setup) to protect only specific subdomains (e.g., www.company.com) without moving NS records to Cloudflare. This is common in Enterprise plans.
    `,
    ["CNAME Flattening vs Partial Setup", "DNSSEC Configuration", "What is Secondary DNS?"]
  ),

  'cdn-cache': createStaticEntry(
    "CDN ve Advanced Caching",
    `
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
    ["Cache-Control Headers", "Purge by Tag", "Origin Cache Control"],
    "CDN & Advanced Caching",
    `
# CDN and Caching Strategies

The heart of Cloudflare is its global Anycast network. It reduces origin server load by keeping your content static at edge servers.

## Cache Rules

Page Rules are now considered "Legacy". The modern approach is to use **Cache Rules**.

### Configuration Example
If you have a dynamic API but responses don't change often:

1.  **Field:** \`Hostname\` eq \`api.mysite.com\` AND \`URL Path\` starts with \`/public/v1\`
2.  **Cache Eligibility:** Eligible for cache
3.  **Edge TTL:** Ignore origin cache control, Override to 1 Hour.

## Tiered Cache and Cache Reserve

*   **Tiered Cache:** Creates a hierarchy between Cloudflare data centers. Requests are checked at Upper Tier data centers before going to the origin. Saves bandwidth.
*   **Cache Reserve:** Stores your content indefinitely on R2 (Object Storage). Prevents eviction for "long-tail" (rarely accessed) content.

> **Pro Tip:** Responses returning \`Cache-Control: private\` headers are NOT cached by Cloudflare by default. You must use Cache Rules to override this.
    `,
    ["Cache-Control Headers", "Purge by Tag", "Origin Cache Control"]
  ),
  
  'workers-intro': createStaticEntry(
    "Workers Temelleri",
    `
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
    ["V8 Isolates", "Edge Runtime", "Wrangler.toml"],
    "Workers Fundamentals",
    `
# Cloudflare Workers: The Future of Serverless

Workers is a serverless platform running on Cloudflare's V8 engine with near-zero cold start time (0ms).

### Architecture and Working Principle
Unlike traditional "Container" or "VM" based Lambda functions, Workers uses **Isolates** technology. Thousands of isolated environments run within a single process.

\`\`\`javascript
// Basic Worker Structure (ES Modules)
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === "/hello") {
      return new Response("Hello World! Greetings from Edge.", {
        headers: { "content-type": "text/plain;charset=UTF-8" }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
\`\`\`

## Wrangler CLI

Use \`npm install -g wrangler\` to manage Workers projects.
*   \`wrangler dev\`: Local test.
*   \`wrangler deploy\`: Global deploy (< 1 sec).
    `,
    ["V8 Isolates", "Edge Runtime", "Wrangler.toml"]
  ),
  
  'waf-rules': createStaticEntry(
    "WAF Custom Rules (Güvenlik Duvarı)",
    `
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
    ["WAF Attack Score", "Rate Limiting", "Payload Logging"],
    "WAF Custom Rules",
    `
# Web Application Firewall (WAF)

Cloudflare WAF operates at OSI Layer 7 and blocks malicious requests before they reach your server.

## Custom Rules (Formerly Firewall Rules)

Uses a structure similar to Wireshark syntax.

### Example Scenarios

1.  **Block Specific Country (Admin Panel):**
    \`(http.request.uri.path contains "/admin") and (ip.geoip.country ne "US")\`
    *Action: Block*

2.  **SQL Injection Protection (Score Based):**
    \`cf.waf.score < 20\`
    *Action: Managed Challenge*

3.  **Block Empty User-Agent:**
    \`http.user_agent eq ""\`
    *Action: Block*

> **Expert Tip:** Use "Managed Challenge" instead of "Block". This presents a verification challenge to potential false positives (real users) instead of blocking them completely.
    `,
    ["WAF Attack Score", "Rate Limiting", "Payload Logging"]
  ),
  
  'r2-storage': createStaticEntry(
    "R2 Object Storage",
     `
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
    ["S3 Compatibility", "Zero Egress Fees", "Presigned URLs"],
    "R2 Object Storage",
    `
# R2 Object Storage

A competitor to AWS S3, storage solution with **No Egress Fees**.

## Why R2?
In AWS S3, putting data in is cheap, taking it out is expensive. R2 has no bandwidth fees, only storage and operation fees.

## Usage
S3 API compatible. You can use existing AWS SDKs.

\`\`\`javascript
// R2 usage within a Worker
const object = await env.MY_BUCKET.get("image.png");

if (object === null) {
  return new Response("Object Not Found", { status: 404 });
}

return new Response(object.body);
\`\`\`

You can also trigger a Worker (Queue) when a file is uploaded to R2 via "Event Notifications".
    `,
    ["S3 Compatibility", "Zero Egress Fees", "Presigned URLs"]
  )
};
