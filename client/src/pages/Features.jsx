export default function Features() {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">  
    <div className=" text-[#4C4B63] py-4">
      <div className="container mx-auto px-4 pt-4 text-center">
        <h1 className="text-4xl font-bold">Welcome to Quiznest!</h1>
        <p className="mt-2 text-lg">Your ultimate quiz creation and sharing platform.</p>
      </div>
    </div>
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#5386e4] mb-12">Key Features</h2>
        <div className="flex items-start mb-12">
          <div className="w-12 h-12 rounded-full bg-[#00AF54] flex justify-center items-center text-white text-xl mr-6">1</div>
          <div>
            <h3 className="text-2xl font-semibold text-[#4C4B63]">User Authentication</h3>
            <p className="mt-2 text-gray-700">Secure login and registration with email verification, supporting third-party logins for quick access.</p>
          </div>
        </div>
        <div className="flex items-start mb-12">
          <div className="w-12 h-12 rounded-full bg-[#00AF54] flex justify-center items-center text-white text-xl mr-6">2</div>
          <div>
            <h3 className="text-2xl font-semibold text-[#4C4B63]">Quiz Creation</h3>
            <p className="mt-2 text-gray-700">Easily design quizzes with multiple-choice questions (MCQs), flexible time limits, and organized categories.</p>
          </div>
        </div>
        <div className="flex items-start mb-12">
          <div className="w-12 h-12 rounded-full bg-[#00AF54] flex justify-center items-center text-white text-xl mr-6">3</div>
          <div>
            <h3 className="text-2xl font-semibold text-[#4C4B63]">Add Participants to Your Quiz</h3>
            <p className="mt-2 text-gray-700">Invite others via email, manage participants, and control access with private or public quizzes.</p>
          </div>
        </div>
        <div className="flex items-start mb-12">
          <div className="w-12 h-12 rounded-full bg-[#00AF54] flex justify-center items-center text-white text-xl mr-6">4</div>
          <div>
            <h3 className="text-2xl font-semibold text-[#4C4B63]">Quiz Taking</h3>
            <p className="mt-2 text-gray-700">Engaging, time-bound quizzes with a clean, responsive interface, instant feedback, and review features.</p>
          </div>
        </div>
        <div className="flex items-start mb-12">
          <div className="w-12 h-12 rounded-full bg-[#00AF54] flex justify-center items-center text-white text-xl mr-6">5</div>
          <div>
            <h3 className="text-2xl font-semibold text-[#4C4B63]">Detailed Results & Analytics</h3>
            <p className="mt-2 text-gray-700">Get detailed insights into quiz performance, including accuracy, time spent, and downloadable reports.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

