import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuth } from '../../context/AuthContext';

const UserNav = () => {
  const { user , currentLoggedInUser} = useAuth();

    const router = useRouter()
    
  return (
    <div className="container-fluid bg-light">
    <div className="row">
      <div className="col-12 mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link href="/profile/registertosell">
              <a
                className={`nav-link ${user && user.emailVerified ?
                  router.pathname == "/profile/registertosell" && "active" : "disabled"
                }`}
              >
                {currentLoggedInUser ? 'Register Data' : 'Register For Sell'}
              </a>
            </Link>
          </li>

          {(currentLoggedInUser && currentLoggedInUser.approvement == 'approved') && 
          <>
          <li className="nav-item">
            <Link href="/profile/properties">
              <a
                className={`nav-link ${( (user && user.emailVerified) && (currentLoggedInUser && currentLoggedInUser.approvement == 'approved') ) ?
                  router.pathname == "/profile/properties" && "active" : "disabled"
                }`}
              >
                Properties
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/profile/deals">
              <a
                className={`nav-link ${( (user && user.emailVerified) && (currentLoggedInUser && currentLoggedInUser.approvement == 'approved') ) ?
                  router.pathname == "/profile/deals" && "active" : "disabled"
                }`}
              >
                Deals
              </a>
            </Link>
          </li>
          </>
          }

        </ul>
      </div>
    </div>
  </div>
  )
}

export default UserNav