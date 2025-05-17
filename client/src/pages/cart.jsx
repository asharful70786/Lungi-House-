
function Cart() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full text-center space-y-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          alt="Cart Coming Soon"
          className="w-32 mx-auto"
        />

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          🛒 Stay Tuned!
        </h1>

        <p className="text-gray-600 text-sm md:text-base">
          Cart feature is coming soon. We're working hard to bring it to you 🚀
        </p>

        <p className="text-gray-500 text-xs">
          Developed with ❤️ by <span className="text-blue-600 font-semibold">Ashraful</span>
        </p>
      </div>
    </div>
  );
}

export default Cart;
