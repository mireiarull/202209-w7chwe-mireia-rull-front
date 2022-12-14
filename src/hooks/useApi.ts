import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { openModalActionCreator } from "../redux/features/uiSlice";
import {
  addRelationshipActionCreator,
  loadAllUsersActionCreator,
  loadOneUserActionCreator,
  updateOneUserActionCreator,
} from "../redux/features/usersSlice";
import { useAppDispatch } from "../redux/hooks";
import { Relation, UserStructure } from "../types";

const url = process.env.REACT_APP_API_SOCIAL!;

const useApi = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const loadAllUsersApi = useCallback(async () => {
    const response = await fetch(`${url}/users/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resultApi = await response.json();

    await resultApi.users.forEach((user: UserStructure) => {
      const relationship = resultApi.usersRelations.find(
        (relation: Relation) =>
          relation.user2 === user.id || relation.user1 === user.id
      );
      if (relationship) {
        user.relation = relationship.relation;
      }
    });

    dispatch(loadAllUsersActionCreator(resultApi.users));
  }, [dispatch, token]);

  const loadUserByIdApi = useCallback(
    async (id: string) => {
      const response = await fetch(`${url}/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userResultApi = await response.json();
      dispatch(loadOneUserActionCreator(userResultApi.user));
    },
    [dispatch, token]
  );

  const updateMyUserApi = useCallback(
    async (user: UserStructure, id: string) => {
      try {
        const response = await axios.put(`${url}/users/update`, user, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        const userResultApi = await response.data;

        dispatch(updateOneUserActionCreator(userResultApi));
        dispatch(openModalActionCreator("User updated!"));
        navigate("/home");
      } catch {
        dispatch(openModalActionCreator("Something went wrong!"));
      }
    },
    [dispatch, navigate, token]
  );

  const addRelationship = useCallback(
    async (relation: Relation) => {
      try {
        const response = await fetch(`${url}/users/add-relationship`, {
          method: "POST",
          body: JSON.stringify(relation),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        if (!response.ok) {
          throw new Error();
        }

        dispatch(addRelationshipActionCreator(relation));
      } catch (error: unknown) {
        throw new Error(`There was an error: ${(error as Error).message}`);
      }
    },
    [dispatch]
  );

  const loadRelations = useCallback(
    async (relation: "friends" | "enemies" | "strangers") => {
      const response = await fetch(`${url}/users/${relation}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resultApi = await response.json();

      await resultApi.users.forEach((user: UserStructure) => {
        const relationship = resultApi.usersRelations.find(
          (relation: Relation) =>
            relation.user2 === user.id || relation.user1 === user.id
        );
        if (relationship) {
          user.relation = relationship.relation;
        }
      });

      const friends = await resultApi.users.filter(
        (user: UserStructure) => user.relation
      );

      dispatch(loadAllUsersActionCreator(friends));
    },
    [dispatch, token]
  );

  return {
    loadAllUsersApi,
    loadUserByIdApi,
    updateMyUserApi,
    addRelationship,
    loadRelations,
  };
};

export default useApi;
