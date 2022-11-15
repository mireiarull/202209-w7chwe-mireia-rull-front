import { useCallback } from "react";
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

  const token = localStorage.getItem("token");

  const loadAllUsersApi = useCallback(async () => {
    const response = await fetch(`${url}/users/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resultApi = await response.json();

    interface Relation {
      user1: string;
      user2: string;
      relation: string;
    }

    resultApi.users.forEach((user: UserStructure & { _id: string }) => {
      const relationship = resultApi.usersRelations.find(
        (relation: Relation) => relation.user2 === user.id
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
      const response = await fetch(`${url}/users/update`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });

      const userResultApi = await response.json();

      dispatch(updateOneUserActionCreator(userResultApi));
    },
    [dispatch, token]
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

  return {
    loadAllUsersApi,
    loadUserByIdApi,
    updateMyUserApi,
    addRelationship,
  };
};

export default useApi;
