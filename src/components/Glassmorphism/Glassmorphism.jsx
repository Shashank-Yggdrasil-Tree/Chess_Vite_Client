const KnowledgeLevel = (props) => {
  const { className, style } = props;
  return (
    <div
      className={`rounded-2xl bg-white bg-opacity-20 p-4 flex flex-col relative ${className}`}
      style={{
        backdropFilter: "blur(10px)",
        ...(style || {}),
      }}
    >
      <div className="font-black text-white text-5xl absolute top-2 right-2"></div>

      <div className="text-white text-lg font-bold mb-2 mt-4"></div>

      <div className="text-white">I'm something of a developer myself</div>
    </div>
  );
};

const Glassmorphism = () => {
  return (
    <div className="flex flex-row justify-center items-center min-h-full bg-app-background bg-center bg-no-repeat bg-cover">
      <main
        className="flex flex-col lg:flex-row bg-white bg-opacity-10 rounded-3xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6"
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="py-8 px-4 lg:px-6 bg-white bg-opacity-10 flex flex-col w-full lg:w-auto lg:max-w-xs"
          style={{
            backdropFilter: "blur(10px)",
          }}
        >
          {/* <img
              className="rounded-full shadow-sm w-40 h-40 mb-4 border-2 border-white select-none mx-auto"
              src={userData.avatar_url}
              alt={userData?.name}
              draggable={false}
            /> */}

          <a href="https://luanedcosta.github.io/react-tailwindcss-glassmorphism/">
            CLICK ON ME
          </a>

          <div className="text-white text-lg font-black flex items-center mb-2">
            {/* <FiUser /> */}
            <span className="ml-4">some name</span>
          </div>

          <div className="text-white flex items-center">
            {/* <FiMessageSquare /> */}
            <span className="ml-4">some bio</span>
          </div>

          <div className="flex flex-row flex-wrap justify-center mt-auto">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/LuanEdCosta"
              className="rounded-full w-14 h-14 flex flex-row justify-center items-center bg-white bg-opacity-10 hover:bg-opacity-20 text-white mt-4 mx-2"
            ></a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/luan-eduardo-costa-aaab591a7/"
              className="rounded-full w-14 h-14 flex flex-row justify-center items-center bg-white bg-opacity-10 hover:bg-opacity-20 text-white mt-4 mx-2"
            ></a>
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-6">
          <div className="text-lg text-white font-black mb-8 flex items-center">
            <div className="ml-4">Programming Languages</div>
          </div>

          <div className="grid grid-rows-4 grid-cols-1 gap-4 md:grid-rows-2 md:grid-cols-2">
            <KnowledgeLevel
              languageName="JavaScript"
              experience="My favorite programming language. I already created many websites using React, Vue and even mobile apps with React Native."
            />

            <KnowledgeLevel
              languageName="PHP"
              experience="I learned PHP in Senai technical course and already created two websites using the Codeigniter framework and a website with just PHP."
            />

            <KnowledgeLevel
              languageName="Java"
              experience="Java is an awesome language. I used Java to create native Android apps, Desktop apps and in programming competitions."
            />

            <KnowledgeLevel
              languageName="Python"
              experience="I don't have experience with Python, but know that is one of the best languages to work with machine learning, big data and automations."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Glassmorphism;
