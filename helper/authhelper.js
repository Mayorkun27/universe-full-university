import bcrypt from 'bcrypt'

// To hash password for Register
export const  passwordHash = async (password) => {
     try {
          const salt = 10;
          const hash =  await bcrypt.hash(password, salt);
          return hash
     } catch (error) {
          console.log(error)
     }
}
// To compare password for Login
export const passwordCompare = async (password, hash) => {
     try {
          const result = await bcrypt.compare(password, hash);
          return result
     } catch (error) {
          console.log(error)
     }
}