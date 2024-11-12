import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

const UserContext = React.createContext();

axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";
  const router = useRouter();

  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    if (!userState.email.includes("@") || !userState.password || userState.password.length < 6) {
      toast.error("Por Favor! entre com um email e senha valido (min 6 caracteres)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      toast.success("Usuário registrado com sucesso!");

      setUserState({ name: "", email: "", password: "" });
      router.push("/login");
    } catch (error) {
      console.error("Erro ao registrar usuário!", error);
      toast.error(error.response?.data?.message || "Erro ao registrar usuário");
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        { email: userState.email, password: userState.password },
        { withCredentials: true }
      );

      toast.success("Usuário logado com sucesso!");
      setUserState({ email: "", password: "" });
      await getUser();
      router.push("/");
    } catch (error) {
      console.error("Erro ao logar", error);
      toast.error(error.response?.data?.message || "Erro ao logar");
    }
  };

  const userLoginStatus = async () => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, { withCredentials: true });
      loggedIn = !!res.data;
      if (!loggedIn) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Erro ao verificar o status de login", error);
    } finally {
      setLoading(false);
    }
    return loggedIn;
  };

  const logoutUser = async () => {
    try {
      await axios.get(`${serverUrl}/api/v1/logout`, { withCredentials: true });
      toast.success("Usuário deslogado com sucesso!");
      setUser({});
      router.push("/login");
    } catch (error) {
      console.error("Erro ao deslogar", error);
      toast.error(error.response?.data?.message || "Erro ao deslogar");
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`, { withCredentials: true });
      if (!res.data) throw new Error("Dados do usuário ausentes");

      setUser((prevState) => ({ ...prevState, ...res.data }));
    } catch (error) {
      console.error("Erro ao buscar informações de usuário", error);
      toast.error(error.response?.data?.message || "Erro ao obter dados do usuário");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data, { withCredentials: true });
      setUser((prevState) => ({ ...prevState, ...res.data }));
      toast.success("Usuário atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar os detalhes do usuário", error);
      toast.error(error.response?.data?.message || "Erro ao atualizar usuário");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/api/v1/admin/users/${id}`, { withCredentials: true });
      toast.success("Usuário deletado com sucesso");
      getAllUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
      toast.error(error.response?.data?.message || "Erro ao deletar usuário");
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/admin/users`, { withCredentials: true });
      setAllUsers(res.data);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
      toast.error(error.response?.data?.message || "Erro ao buscar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();
      if (isLoggedIn) await getUser();
    };
    loginStatusGetUser();
  }, []);

  useEffect(() => {
    if (user && user.role === "admin") {
      getAllUsers();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handlerUserInput: (name) => (e) => setUserState((prev) => ({ ...prev, [name]: e.target.value })),
        loginUser,
        logoutUser,
        userLoginStatus,
        user,
        updateUser,
        deleteUser,
        allUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
