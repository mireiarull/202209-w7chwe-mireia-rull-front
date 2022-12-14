import styled from "styled-components";

const UserDetailsStyled = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  height: 500px;
  margin: 20px 0;
  border-radius: 20px;
  margin: 20px 20px;
  position: relative;

  .user__name {
    font-size: 1.6rem;
    margin-top: 10px;
  }

  img {
    aspect-ratio: 1;
    height: 230px;
    object-fit: cover;
    margin-bottom: 10px;
    width: 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }

  .user__relationship {
    background-color: #6b3fbe;
    border-radius: 20px;
    padding: 4px 15px;
    color: white;
    font-weight: 400;
    position: absolute;
    top: 215px;
  }

  @media screen and (min-width: 750px) {
    .user__inner {
      display: flex;
      gap: 20px;
      img {
        width: 150px;
      }
    }
    width: 50vw;
    margin: 30px auto;
    height: 70vh;
  }

  .user__info {
    li {
      margin-top: 5px;
      font-size: 1rem;
      span {
        font-weight: bold;
      }
    }
  }

  .user__buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    button {
      font-size: 1rem;
      font-weight: 400;
      padding: 5px 10px;
    }

    &-friend {
      background-color: #d544ad;
    }

    &-enemy {
      background-color: #4f2ad0;
    }
  }

  .user__buttons-edit {
    position: absolute;
    right: 0px;
    font-size: 1.75rem;
    background-color: white;
    padding: 5px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.267);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: #6b3fbe;
      box-shadow: 0px 15px 20px #6b3fbe;
      color: #fff;
      transform: translateY(-7px);
    }
  }
`;

export default UserDetailsStyled;
