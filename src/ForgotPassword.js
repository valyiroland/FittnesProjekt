import React from 'react'

export default function ForgotPassword() {
  return (
    <div>
        <div className="content2">
      <div className="login-form">
        <h2>New password</h2>
        <form>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Enter your new password"         
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Confirm password"         
              required
            />
          </div>
          <button className="login-button" type="submit">Save</button>
          </form>
          </div>
          </div>
    </div>
  )
}
