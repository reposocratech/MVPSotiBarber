import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';

import './userIcon.css';

export const UserIcon = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="d-flex gap-3 me-4">
      <div>
        {user.avatar ? (
          <div className="user-image">
            <img src={`${import.meta.env.VITE_SERVER_URL}/images/users/${user?.avatar}`} alt="img user profile" />
          </div>
        ) : (
          <div className="user-letter">
            <h2>
              {(user?.user_name?.at(0) || "").toUpperCase()}
              {(user?.lastname?.at(0) || "").toUpperCase()}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
