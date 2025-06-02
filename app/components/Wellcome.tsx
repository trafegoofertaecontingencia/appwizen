export default function Wellcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
        Bem-vindo ao Wizen 👋
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-md mb-6">
        O seu novo assistente financeiro inteligente. Clareza, controle e
        liberdade para sua vida financeira.
      </p>
      <a
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg"
      >
        Comece agora
      </a>
    </div>
  );
}
