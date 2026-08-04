/**
 * One Day Multimedia - AI Chatbot
 * A smart assistant that answers questions about the company's services.
 */

(function () {
  // ─── Knowledge Base ────────────────────────────────────────────────────────
  const KB = [
    // Greetings
    {
      patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy", "what's up", "sup"],
      response: "Hello! 👋 Welcome to One Day Multimedia. I'm your virtual assistant. I can help you with info about our printing services, pricing, turnaround time, and more. What can I help you with today?"
    },

    // Services overview
    {
      patterns: ["services", "what do you do", "what do you offer", "what can you do", "offerings", "products"],
      response: "We offer a wide range of professional printing and multimedia services:\n\n🖨️ Digital Printing\n📐 Large Format Printing\n👕 T-Shirt & Apparel Printing\n💼 Business Cards\n🎯 Banners & Signage\n📦 Promotional Items & Branded Merchandise\n🎨 Graphic Design\n\nWhich service would you like to know more about?"
    },

    // Digital printing
    {
      patterns: ["digital print", "flyer", "flyers", "brochure", "brochures", "leaflet", "pamphlet", "poster", "posters"],
      response: "Our digital printing covers:\n\n✅ Flyers & Leaflets (A4, A5, DL, custom sizes)\n✅ Brochures (bi-fold, tri-fold)\n✅ Posters (A3, A2, A1, custom)\n✅ Full-colour, high-resolution printing\n\nWe use premium paper stocks and fast turnaround. Want a quote? Reach us via WhatsApp or our contact form!"
    },

    // Large format
    {
      patterns: ["large format", "banner", "banners", "billboard", "roll up", "rollup", "pull up", "backdrop", "canvas", "vinyl"],
      response: "Our large format printing includes:\n\n🏳️ Roll-Up / Pull-Up Banners\n🖼️ Canvas Prints\n🪟 Vinyl & Window Graphics\n📢 Outdoor Billboards\n🎪 Event Backdrops\n\nPerfect for events, trade shows, and outdoor advertising. Contact us for sizing and pricing!"
    },

    // T-shirt printing
    {
      patterns: ["t-shirt", "tshirt", "t shirt", "shirt", "apparel", "jersey", "uniform", "clothing", "custom wear", "embroid"],
      response: "We do professional T-Shirt & Apparel Printing:\n\n👕 Custom T-Shirts (all sizes)\n🏢 Corporate Uniforms\n🎽 Sports Jerseys\n📋 Embroidery available\n🎨 Screen printing & DTG (Direct-to-Garment)\n\nMinimum orders and bulk discounts available. Drop us a message to discuss your design!"
    },

    // Business cards
    {
      patterns: ["business card", "card", "visiting card", "name card"],
      response: "Our Business Cards are professional and affordable:\n\n💳 Standard & Premium finishes\n✨ Matte, Gloss, Soft-touch lamination\n📐 Standard (85×55mm) or custom sizes\n🎨 Double-sided full colour\n⚡ Quick turnaround available\n\nPerfect for networking! Contact us for pricing."
    },

    // Pricing
    {
      patterns: ["price", "prices", "pricing", "cost", "how much", "rate", "rates", "quote", "quotation", "cheap", "affordable"],
      response: "Our pricing is competitive and depends on:\n\n📏 Size & quantity\n🎨 Number of colours\n📄 Paper/material type\n⚡ Turnaround time\n\nFor an accurate quote, please:\n📱 WhatsApp us: +233 242 145 496\n📧 Or use our Contact Form at contact.html\n\nWe'll get back to you quickly!"
    },

    // Turnaround / delivery time
    {
      patterns: ["turnaround", "how long", "delivery", "time", "how fast", "quick", "same day", "rush", "urgent", "when ready"],
      response: "We're known for our fast turnaround! ⚡\n\n🚀 Same-day delivery available for select orders\n📅 Standard: 1–3 business days\n📦 Large format & custom orders: 2–5 days\n\nNeed it urgently? Just let us know — we'll do our best to accommodate you!"
    },

    // Location / address
    {
      patterns: ["location", "address", "where are you", "find you", "directions", "located", "shop", "office"],
      response: "📍 We're located at:\n\nTwifo Mampong, Box 7, Twifo, Ghana\n\n📱 WhatsApp: +233 242 145 496\n📞 Phone: +233 242 145 496\n🌐 Contact Form: contact.html\n\nFeel free to get in touch and we'll guide you to us!"
    },

    // Contact
    {
      patterns: ["contact", "reach you", "call", "phone", "whatsapp", "email", "get in touch", "talk to"],
      response: "You can reach us through:\n\n📱 WhatsApp: +233 242 145 496 (tap the green button on the page!)\n📋 Contact Form: Visit our Contact page\n\nWe're available Monday–Saturday and aim to respond within the hour!"
    },

    // Design services
    {
      patterns: ["design", "graphic", "logo", "artwork", "create", "make", "custom design", "designer"],
      response: "We offer in-house Graphic Design services! 🎨\n\n✅ Logo Design\n✅ Flyer & Brochure Layouts\n✅ Social Media Graphics\n✅ Brand Identity Packages\n\nSend us your idea or brief and our design team will bring it to life. Contact us for design quotes!"
    },

    // Promotional items
    {
      patterns: ["promotional", "promo", "merchandise", "branded", "mug", "cap", "hat", "pen", "bag", "gift", "souvenirs"],
      response: "We supply a wide range of Promotional Items:\n\n🎁 Branded Mugs & Cups\n🧢 Custom Caps & Hats\n🖊️ Pens & Stationery\n👜 Branded Bags\n🎀 Corporate Gifts\n\nGreat for events, giveaways, and staff gifts. Ask us for a full catalogue!"
    },

    // About the company
    {
      patterns: ["about", "who are you", "company", "history", "how long", "experience", "since when"],
      response: "One Day Multimedia is a professional printing and multimedia company committed to quality, speed, and customer satisfaction. 🏆\n\nWe've been serving businesses and individuals with top-notch printing solutions. Our team is passionate about bringing your brand to life!\n\nVisit our About page to learn more."
    },

    // Quality
    {
      patterns: ["quality", "good quality", "reliable", "trust", "guarantee", "warranty"],
      response: "Quality is our #1 priority! ✅\n\nWe use:\n🖨️ Professional-grade printing equipment\n📄 Premium paper & material stocks\n🎨 Colour-accurate calibration\n\nNot satisfied? We'll make it right. Customer satisfaction is guaranteed!"
    },

    // Payment
    {
      patterns: ["payment", "pay", "how to pay", "deposit", "momo", "mobile money", "cash", "bank", "transfer"],
      response: "We accept multiple payment methods for your convenience:\n\n💵 Cash\n📲 Mobile Money (MoMo)\n🏦 Bank Transfer\n\nA deposit may be required for large orders. Contact us to discuss payment options!"
    },

    // Bulk / wholesale
    {
      patterns: ["bulk", "wholesale", "large order", "lots", "many", "quantity", "discount"],
      response: "Yes, we offer bulk discounts! 📦\n\nThe more you order, the more you save:\n\n✅ Volume pricing available\n✅ Corporate & reseller packages\n✅ Special rates for recurring clients\n\nContact us with your quantities for a custom quote!"
    },

    // Thanks / goodbye
    {
      patterns: ["thank", "thanks", "thank you", "great", "awesome", "perfect", "bye", "goodbye", "see you", "that's all"],
      response: "You're welcome! 😊 It was great chatting with you. If you ever have more questions, I'm always here.\n\nDon't forget — you can also reach us directly on WhatsApp: +233 242 145 496. Have a wonderful day! 🌟"
    },

    // Help
    {
      patterns: ["help", "what can you do", "menu", "options"],
      response: "Here are some things you can ask me:\n\n📋 Our Services\n💰 Pricing & Quotes\n👕 T-Shirt Printing\n🖨️ Digital Printing\n📐 Large Format & Banners\n💼 Business Cards\n⚡ Turnaround Time\n📍 Location & Contact\n🎁 Promotional Items\n🎨 Design Services\n\nJust type your question and I'll help!"
    }
  ];

  const DEFAULT_RESPONSE = "I'm not sure about that, but our team will know! 😊\n\nPlease contact us directly:\n📱 WhatsApp: +233 242 145 496\n📋 Or use our Contact Form\n\nWe'll get back to you quickly!";

  // ─── Response Engine ───────────────────────────────────────────────────────
  function getResponse(input) {
    const text = input.toLowerCase().trim();
    if (!text) return null;

    // Score each KB entry by how many patterns match
    let bestMatch = null;
    let bestScore = 0;

    for (const entry of KB) {
      let score = 0;
      for (const pattern of entry.patterns) {
        if (text.includes(pattern)) {
          score += pattern.length; // longer matches score higher
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    return bestMatch ? bestMatch.response : DEFAULT_RESPONSE;
  }

  // ─── UI Builder ────────────────────────────────────────────────────────────
  function buildChatUI() {
    // Inject CSS
    const style = document.createElement("style");
    style.textContent = `
      #odm-chat-btn {
        position: fixed;
        bottom: 40px;
        left: 40px;
        width: 60px;
        height: 60px;
        background-color: #dc2626;
        color: #fff;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(220,38,38,0.5);
        z-index: 9999;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        animation: odm-pulse 2s infinite;
      }
      #odm-chat-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(220,38,38,0.6);
      }
      @keyframes odm-pulse {
        0%, 100% { box-shadow: 0 4px 15px rgba(220,38,38,0.5); }
        50% { box-shadow: 0 4px 25px rgba(220,38,38,0.8); }
      }
      #odm-chat-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background: #1d4ed8;
        color: #fff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        animation: odm-badge-pop 0.4s ease;
      }
      @keyframes odm-badge-pop {
        0% { transform: scale(0); }
        70% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      #odm-chat-window {
        position: fixed;
        bottom: 115px;
        left: 40px;
        width: 340px;
        max-height: 500px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        display: flex;
        flex-direction: column;
        z-index: 9998;
        overflow: hidden;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform-origin: bottom left;
      }
      #odm-chat-window.odm-hidden {
        opacity: 0;
        transform: scale(0.85);
        pointer-events: none;
      }
      #odm-chat-header {
        background: linear-gradient(135deg, #dc2626, #b91c1c);
        color: #fff;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      #odm-chat-header .odm-avatar {
        width: 36px;
        height: 36px;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
      }
      #odm-chat-header .odm-header-text h4 {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
      }
      #odm-chat-header .odm-header-text p {
        margin: 0;
        font-size: 11px;
        opacity: 0.85;
      }
      #odm-chat-header .odm-online-dot {
        width: 8px;
        height: 8px;
        background: #4ade80;
        border-radius: 50%;
        display: inline-block;
        margin-right: 4px;
        animation: odm-blink 1.5s infinite;
      }
      @keyframes odm-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      #odm-chat-close {
        margin-left: auto;
        background: none;
        border: none;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        opacity: 0.8;
        line-height: 1;
        padding: 4px;
      }
      #odm-chat-close:hover { opacity: 1; }
      #odm-messages {
        flex: 1;
        overflow-y: auto;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 300px;
        scroll-behavior: smooth;
      }
      #odm-messages::-webkit-scrollbar { width: 4px; }
      #odm-messages::-webkit-scrollbar-track { background: #f1f1f1; }
      #odm-messages::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
      .odm-msg {
        max-width: 82%;
        padding: 9px 12px;
        border-radius: 14px;
        font-size: 13px;
        line-height: 1.5;
        word-wrap: break-word;
        white-space: pre-wrap;
        animation: odm-msg-in 0.25s ease;
      }
      @keyframes odm-msg-in {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .odm-msg-bot {
        background: #f3f4f6;
        color: #1f2937;
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }
      .odm-msg-user {
        background: #dc2626;
        color: #fff;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }
      .odm-typing {
        background: #f3f4f6;
        color: #9ca3af;
        align-self: flex-start;
        border-bottom-left-radius: 4px;
        padding: 10px 14px;
        font-size: 18px;
        letter-spacing: 3px;
      }
      .odm-quick-replies {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 0 14px 10px;
      }
      .odm-quick-btn {
        background: #fff;
        border: 1.5px solid #dc2626;
        color: #dc2626;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }
      .odm-quick-btn:hover {
        background: #dc2626;
        color: #fff;
      }
      #odm-chat-input-area {
        display: flex;
        align-items: center;
        padding: 10px 12px;
        border-top: 1px solid #e5e7eb;
        gap: 8px;
        background: #fff;
      }
      #odm-chat-input {
        flex: 1;
        border: 1.5px solid #e5e7eb;
        border-radius: 22px;
        padding: 8px 14px;
        font-size: 13px;
        outline: none;
        transition: border-color 0.2s;
        resize: none;
        font-family: inherit;
      }
      #odm-chat-input:focus { border-color: #dc2626; }
      #odm-chat-send {
        width: 36px;
        height: 36px;
        background: #dc2626;
        color: #fff;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        transition: background 0.2s, transform 0.2s;
        flex-shrink: 0;
      }
      #odm-chat-send:hover { background: #b91c1c; transform: scale(1.05); }
      @media (max-width: 480px) {
        #odm-chat-window {
          left: 10px;
          right: 10px;
          width: auto;
          bottom: 110px;
        }
        #odm-chat-btn {
          left: 16px;
          bottom: 30px;
        }
      }
    `;
    document.head.appendChild(style);

    // Chat toggle button
    const btn = document.createElement("button");
    btn.id = "odm-chat-btn";
    btn.setAttribute("aria-label", "Open chat assistant");
    btn.innerHTML = '<i class="fas fa-comment-dots"></i>';

    const badge = document.createElement("span");
    badge.id = "odm-chat-badge";
    badge.textContent = "1";
    btn.appendChild(badge);
    document.body.appendChild(btn);

    // Chat window
    const win = document.createElement("div");
    win.id = "odm-chat-window";
    win.classList.add("odm-hidden");
    win.setAttribute("role", "dialog");
    win.setAttribute("aria-label", "Chat with One Day Multimedia assistant");
    win.innerHTML = `
      <div id="odm-chat-header">
        <div class="odm-avatar"><i class="fas fa-robot"></i></div>
        <div class="odm-header-text">
          <h4>ODM Assistant</h4>
          <p><span class="odm-online-dot"></span>Online · One Day Multimedia</p>
        </div>
        <button id="odm-chat-close" aria-label="Close chat">&times;</button>
      </div>
      <div id="odm-messages"></div>
      <div class="odm-quick-replies" id="odm-quick-replies"></div>
      <div id="odm-chat-input-area">
        <input id="odm-chat-input" type="text" placeholder="Type your question..." maxlength="300" />
        <button id="odm-chat-send" aria-label="Send message"><i class="fas fa-paper-plane"></i></button>
      </div>
    `;
    document.body.appendChild(win);

    return { btn, badge, win };
  }

  // ─── Quick Replies ─────────────────────────────────────────────────────────
  const QUICK_REPLIES = ["Our Services", "Pricing", "T-Shirt Printing", "Banners", "Contact Us", "Turnaround Time"];

  function renderQuickReplies(container, onSelect) {
    container.innerHTML = "";
    QUICK_REPLIES.forEach((label) => {
      const b = document.createElement("button");
      b.className = "odm-quick-btn";
      b.textContent = label;
      b.addEventListener("click", () => onSelect(label));
      container.appendChild(b);
    });
  }

  // ─── Message Helpers ───────────────────────────────────────────────────────
  function appendMessage(messagesEl, text, role) {
    const msg = document.createElement("div");
    msg.className = `odm-msg odm-msg-${role}`;
    msg.textContent = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  function showTyping(messagesEl) {
    const t = document.createElement("div");
    t.className = "odm-typing";
    t.id = "odm-typing-indicator";
    t.textContent = "●●●";
    messagesEl.appendChild(t);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById("odm-typing-indicator");
    if (t) t.remove();
  }

  // ─── Init ──────────────────────────────────────────────────────────────────
  function init() {
    const { btn, badge, win } = buildChatUI();
    const messagesEl = document.getElementById("odm-messages");
    const inputEl = document.getElementById("odm-chat-input");
    const sendBtn = document.getElementById("odm-chat-send");
    const closeBtn = document.getElementById("odm-chat-close");
    const quickContainer = document.getElementById("odm-quick-replies");
    let opened = false;

    // Welcome message (delayed so user sees it appear)
    function sendWelcome() {
      setTimeout(() => {
        appendMessage(
          messagesEl,
          "Hi there! 👋 I'm the One Day Multimedia assistant. Ask me about our printing services, pricing, turnaround time, or anything else!",
          "bot"
        );
        renderQuickReplies(quickContainer, handleUserInput);
      }, 400);
    }

    // Handle a user message
    function handleUserInput(text) {
      const trimmed = (text || "").trim();
      if (!trimmed) return;

      // Show user message
      appendMessage(messagesEl, trimmed, "user");
      inputEl.value = "";

      // Clear quick replies while responding
      quickContainer.innerHTML = "";

      // Simulate typing delay
      showTyping(messagesEl);
      const delay = 600 + Math.min(trimmed.length * 10, 800);
      setTimeout(() => {
        removeTyping();
        const response = getResponse(trimmed);
        appendMessage(messagesEl, response, "bot");
        renderQuickReplies(quickContainer, handleUserInput);
      }, delay);
    }

    // Toggle open/close
    btn.addEventListener("click", () => {
      const isHidden = win.classList.contains("odm-hidden");
      win.classList.toggle("odm-hidden", !isHidden);
      btn.setAttribute("aria-expanded", String(isHidden));

      if (isHidden && !opened) {
        opened = true;
        badge.remove();
        sendWelcome();
      }
    });

    closeBtn.addEventListener("click", () => {
      win.classList.add("odm-hidden");
      btn.setAttribute("aria-expanded", "false");
    });

    // Send on button click
    sendBtn.addEventListener("click", () => handleUserInput(inputEl.value));

    // Send on Enter key
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleUserInput(inputEl.value);
      }
    });
  }

  // Run after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
