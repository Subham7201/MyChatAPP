import { useContext, useState } from "react";
import { Button, Img, Text } from "../components";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const { setUsername: setLoggeedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === "register" ? "register" : "login";
    const { data } = await axios.post(url, { username, password });
    setLoggeedInUsername(username);
    setId(data.id);
  }

  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-white-A700 flex flex-col font-poppins h-[960px] items-center justify-start mx-auto pb-36 w-full"
        style={{ backgroundImage: "url('images/img_applevisionpro.png')" }}
      >
        <div className="flex flex-col md:gap-10 gap-20 items-center justify-start w-full">
          <div className="bg-white-A700_19 flex flex-col items-center justify-start w-full">
            <Img
              className="h-[88px]"
              src="images/img_frame77.svg"
              alt="frameSeventySeven"
            />
          </div>
          <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between max-w-[1736px] mx-auto md:px-5 w-full">
            <div className="flex md:flex-1 flex-col items-start justify-start w-auto md:w-full">
              <Img
                className="h-[173px] w-[113px]"
                src="images/img_group.svg"
                alt="group"
              />
              <Text
                className="text-5xl sm:text-[38px] md:text-[44px] text-center text-white-A700 w-auto"
                size="txtPoppinsBold48"
              >
                Welcome to
              </Text>
              <Text
                className="text-5xl sm:text-[38px] md:text-[44px] text-center text-white-A700 w-auto"
                size="txtPoppinsBold48"
              >
                Goodspace Communications
              </Text>
            </div>
            <div className="bg-white-A700_19 flex md:flex-1 flex-col items-start justify-start p-[66px] md:px-10 sm:px-5 rounded-[33px] w-[41%] md:w-full">
              <Text
                className="ml-6 md:ml-[0] text-4xl sm:text-[32px] md:text-[34px] text-center text-white-A700"
                size="txtPoppinsBold36"
              >
                Login
              </Text>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 items-start justify-start ml-6 md:ml-[0] mt-[63px] w-auto sm:w-full">
                  <div className="flex flex-col gap-2 items-start justify-center w-[513px] sm:w-full">
                    <div className="flex flex-col items-center justify-center w-auto">
                      <Text
                        className="text-base text-white-A700 w-auto"
                        size="txtPoppinsMedium16"
                      >
                        Your Email id
                      </Text>
                    </div>
                    <input
                      value={username}
                      onChange={(ev) => setUsername(ev.target.value)}
                      type="text"
                      placeholder="username"
                      className="bg-gray-50 border border-gray-200 border-solid h-12 rounded-[5px] w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-center w-[513px] sm:w-full">
                    <div className="flex flex-col items-center justify-center w-auto">
                      <Text
                        className="text-base text-white-A700 w-auto"
                        size="txtPoppinsMedium16"
                      >
                        Password
                      </Text>
                    </div>
                    <input
                      value={password}
                      onChange={(ev) => setPassword(ev.target.value)}
                      type="password"
                      placeholder="password"
                      className="bg-gray-50 border border-gray-200 border-solid h-12 rounded-[5px] w-full"
                    />
                  </div>
                </div>
                <Button className="cursor-pointer font-extrabold mb-[93px] min-w-[513px] sm:min-w-full ml-6 md:ml-[0] mt-20 text-center text-xl tracking-[1.60px]">
                  {isLoginOrRegister === "register" ? "Register" : "Login"}
                </Button>
                <div className="text-center mt-2">
                  {isLoginOrRegister === "register" && (
                    <div>
                      Already a member?
                      <button
                        className="ml-1"
                        onClick={() => setIsLoginOrRegister("login")}
                      >
                        Login here
                      </button>
                    </div>
                  )}
                  {isLoginOrRegister === "login" && (
                    <div>
                      Don't have an account?
                      <button
                        className="ml-1"
                        onClick={() => setIsLoginOrRegister("register")}
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
