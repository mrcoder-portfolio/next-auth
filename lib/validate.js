export function login_validate(value) {
   const errors = {}
   if (!value.email) {
      errors.email = "Required"
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      errors.email = 'Invalid email address';
   }
   //validation for password
   if (!value.password) {
      errors.password = "Required"
   } else if (value.password.length < 8 || value.password.length > 20) {
      errors.password = "Must be between 8-20"
   }
   return errors
}

export function register_validate(value) {
   const errors = {}
   if(!value.username){
      errors.username = "Required"
   } else if(value.username.includes(" ")){
      errors.username = "Invalid Username"
   }
   if (!value.email) {
      errors.email = "Required"
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      errors.email = 'Invalid email address';
   }
   //validation for password
   if (!value.password) {
      errors.password = "Required"
   } else if (value.password.length < 8 || value.password.length > 20) {
      errors.password = "Must be between 8-20"
   }
   return errors
}

