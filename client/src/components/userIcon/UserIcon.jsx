import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';

import './userIcon.css';

export const UserIcon = () => {
  const { user } = useContext(AuthContext);
  const iniciales = user?.user_name?.at(0) || user?.lastname?.at(0);

  return (
    <div>
      <div >
        {user.avatar ? (
          <div className="user-image">
            <img src={`${import.meta.env.VITE_SERVER_URL}/images/users/${user?.avatar}`} alt="img user profile" />
          </div>
        ) : iniciales? (
          <div className="user-letter">
            <p>
              {(user?.user_name?.at(0) || "").toUpperCase()}
              {(user?.lastname?.at(0) || "").toUpperCase()}
            </p>
          </div>
        ): (
            <div className="icon-image d-flex justify-content-center">
            <img src="/assets/icons/logoNavbar.png" alt="default user icon" />
          </div>
        )}
      </div>
    </div>
  );
};
