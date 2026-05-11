export default function WhatsAppButton() {
  const href =
    "https://wa.me/491726666297?text=Hallo%20Wietek-Team%2C%20ich%20interessiere%20mich%20f%C3%BCr%20ein%20Ger%C3%BCst.";

  return (
    <>
      <style>{`
        @keyframes whatsapp-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
          70% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .whatsapp-btn {
          animation: whatsapp-pulse 2s infinite;
        }
        .whatsapp-btn:hover {
          animation: none;
          background-color: #128C7E !important;
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(37, 211, 102, 0.7);
        }
      `}</style>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Auf WhatsApp schreiben"
        className="whatsapp-btn fixed bottom-8 right-8 z-50 flex items-center justify-center w-[60px] h-[60px] rounded-full transition-all duration-300"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="34" height="34">
          <path fill="#fff" d="M4.868 43.303l2.694-9.835a18.91 18.91 0 01-2.53-9.489C5.034 13.514 13.548 5 24.014 5c5.079.002 9.845 1.979 13.43 5.566a18.921 18.921 0 015.556 13.428c-.004 10.465-8.522 18.98-18.986 18.98a18.98 18.98 0 01-9.073-2.31L4.868 43.303z"/>
          <path fill="#25D366" d="M24.014 7.5c-9.108 0-16.514 7.406-16.514 16.511a16.47 16.47 0 002.66 9.012l.414.657-1.756 6.41 6.576-1.724.634.376a16.45 16.45 0 008.99 2.659h.007c9.101 0 16.504-7.406 16.508-16.511A16.42 16.42 0 0036.7 12.847 16.43 16.43 0 0024.014 7.5z"/>
          <path fill="#fff" fillRule="evenodd" d="M19.268 16.042c-.355-.79-.729-.806-1.067-.82-.276-.012-.592-.011-.908-.011s-.83.119-1.265.594c-.435.475-1.661 1.622-1.661 3.956s1.7 4.59 1.937 4.907c.237.317 3.282 5.259 8.104 7.167 4.007 1.582 4.823 1.267 5.693 1.188.87-.079 2.808-1.148 3.203-2.256.395-1.108.395-2.059.277-2.256-.119-.198-.435-.317-.909-.554s-2.808-1.385-3.243-1.542c-.435-.158-.751-.238-1.067.237-.316.475-1.225 1.542-1.502 1.859-.277.316-.554.356-1.027.119-.474-.238-2-.737-3.812-2.353-1.409-1.257-2.361-2.81-2.638-3.285-.277-.475-.03-.732.208-.969.213-.213.474-.554.711-.831.237-.277.316-.475.475-.791.158-.317.079-.594-.04-.831-.118-.238-1.04-2.582-1.463-3.528z" clipRule="evenodd"/>
        </svg>
      </a>
    </>
  );
}
