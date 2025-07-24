import React, { useEffect, useState } from "react";
import Paragraph from "../Components/ParaAni";
import Button from "../Components/ButtonAni";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const SignIn = ({ openSignIn, SetOpenSignIn }) => {
  const [showContent, setShowContent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let timer;
    if (openSignIn) {
      timer = setTimeout(() => setShowContent(true), 450);
    } else {
      setShowContent(false);
      setEmail("");
      setPassword("");
      setError("");
    }
    return () => clearTimeout(timer);
  }, [openSignIn]);

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      // console.log("Signed in with", { email, password });
      setEmail("");
      setPassword("");
      SetOpenSignIn(false);
    }
  };

  return (
    <div
      className={`h-[100%] ${
        openSignIn
          ? "w-[40%] max-2xl:w-[60%] duration-700 max-lg:w-full"
          : "w-0 delay-300 duration-700"
      } bg-black  flex text-white overflow-hidden flex-col items-center justify-center fixed right-0 top-0 z-[50]`}
    >
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="w-full h-full flex flex-col items-center justify-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Close Button - always visible in top-right */}
            <button
              onClick={() => SetOpenSignIn(false)}
              className="absolute top-8 right-4 text-4xl text-white bg-transparent border-none cursor-pointer z-50 p-2 hover:bg-white/10 rounded-full focus:outline-none"
              aria-label="Close Sign In"
              type="button"
            >
              <IoMdClose />
            </button>
            {/* Header */}
            <div className="w-full absolute top-0 flex justify-between font-['Decorative'] p-5 tracking-wider uppercase">
              <h3 className="text-3xl  max-md:text-2xl">
                <span className="font-['Decorative'] text-[.7rem]">vp.</span>
              </h3>
            </div>

            {/* Main Content */}
            <div className="flex flex-col mt-[10vh] items-center justify-center gap-6 max-md:gap-4 w-full">
              <h1 className="text-4xl text-center max-md:text-3xl font-['Decorative']  max-md:pb-2">
                <span className="font-['Decorative'] text-[1rem]">
                  WELCOME BACK 🪽
                </span>
              </h1>
              <Paragraph
                className={`font-['Primary'] uppercase text-center leading-none`}
                phrases={[
                  "Log in to track your favorite drops and",
                  "explore our world of fabric & form.",
                ]}
              />

              <Button
                text={"Continue with Google"}
                onClick={() => console.log("Google Sign In")}
                customclass={`text-xl tracking-wide mx-auto bg-white text-black border-white border-[1px]`}
                circ={`bg-black`}
                p={`group-hover:text-white `}
              >
                <FcGoogle className="mx-4" />
              </Button>

              <Button
                text={"Continue with Apple"}
                onClick={() => console.log("Apple Sign In")}
                customclass={`text-xl tracking-wide mx-auto bg-white text-black border-white border-[1px]`}
                circ={`bg-black`}
                p={`group-hover:text-white `}
              >
                <GrApple className="mx-5 text-xl group-hover:text-white duration-300" />
              </Button>

              <h3 className="font-['Primary'] text-xl tracking-wider">
                OR SIGN IN WITH
              </h3>

              <div className="flex flex-col gap-2 items-start w-[50%] max-md:w-[65%]">
                <h3 className="font-['Primary'] tracking-wider text-xl">
                  EMAIL
                </h3>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full font-['Primary'] outline-none py-3 px-3 border-[1px] border-white bg-transparent text-white"
                />
              </div>

              <div className="flex flex-col gap-2 pb-3 items-start w-[50%] max-md:w-[65%]">
                <h3 className="font-['Primary'] tracking-wider text-xl">
                  PASSWORD
                </h3>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full font-['Primary'] outline-none py-3 px-3 border-[1px] border-white bg-transparent text-white"
                />
              </div>

              {error && (
                <p className="text-red-500 font-['Primary'] uppercase text-sm -mt-3">
                  {error}
                </p>
              )}

              <Button
                text={"SIGN IN"}
                onClick={handleSignIn}
                customclass={`text-xl tracking-wider mx-auto bg-white text-black border-white border-[1px]`}
                circ={`bg-black`}
                p={`group-hover:text-white `}
              />

              <div className="flex mt-[5vh] text-sm max-sm:text-xs font-['poppins'] items-center justify-between w-[60%] max-md:w-[80%] uppercase">
                <h3 className="cursor-pointer">Forgot Password ?</h3>
                <h3 className="cursor-pointer">Create New Account</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignIn;
