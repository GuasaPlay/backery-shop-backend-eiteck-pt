const response400 = (res, message) => {
   return res.status(400).json({
      ok: false,
      errors: [
         {
            message,
         },
      ],
   })
}
const response500 = res => {
   return res.status(500).json({
      ok: false,
      errors: [
         {
            message:
               'Ocurrio un error con el servidor, vuelve a intentarlo mas tarde',
         },
      ],
   })
}

export { response400, response500 }
