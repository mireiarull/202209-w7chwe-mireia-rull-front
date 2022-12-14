import { useEffect } from "react";
import Header from "../../components/Header/Header";
import UserCardList from "../../components/UserCardList/UserCardList";
import useApi from "../../hooks/useApi";
import useToken from "../../hooks/useToken";
import { useAppSelector } from "../../redux/hooks";
import MainPageStyled from "./MainPageStyled";

const MainPage = () => {
  const { getToken } = useToken();
  const { loadAllUsersApi } = useApi();
  const users = useAppSelector(({ users }) => users.list);

  useEffect(() => {
    getToken();
    loadAllUsersApi();
  }, [getToken, loadAllUsersApi]);

  return (
    <MainPageStyled className="container">
      <Header />
      <span className="count">Showing {users.length} profiles</span>
      <UserCardList />
    </MainPageStyled>
  );
};

export default MainPage;
