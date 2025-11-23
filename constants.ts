import { Category } from './types';

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