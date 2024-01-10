
import { useRef } from 'react'
import { useForm } from 'react-hook-form';

function Formulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      fechaNacimiento: "",
      password: "",
      confirmarPassword: "",
      pais: "co",
      archivo: "",
      aceptaTerminos: false,
    },
  });




  const password = useRef(null)
  password.current = watch("password", "");

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    reset()
  })
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" name="nombre"
            {...register("nombre", {
              required: {
                value: true,
                message: "Nombre es requerido",
              },
              maxLenght: 20,
              minLenght: 2,
            })} />
          {errors.nombre?.type === "require" && <span>Nombre requero</span>}
          {errors.nombre?.type === "maxLenght" && (
            <span>Nombre debe ser menor a 20 caracteres</span>
          )}
          {errors.nombre?.type === "minLenght" && (
            <span>Nombre debe ser mayor a 2 caracteres</span>
          )}
        </div>

        <div>
          <label>Correo Electronico</label>
          <input
            type="email"
            name="correo"
            {...register("correo", {
              required: {
                value: true,
                message: "Correo es requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Correo no válido",
              },
            })}
          />
          {errors.correo && <span>{errors.correo.message}</span>}
        </div>

        <div>
          <label>Fecha de nacimiento</label>
          <input type="date" name="fechaNacimiento"
            {...register("fechaNacimiento", {
              required: {
                value: true,
                message: "Fecha de nacimiento es requerida",
              },
              validate: (value) => {
                const fechaNacimiento = new Date(value)
                const fechaActual = new Date()
                const edad =
                  fechaActual.getFullYear() - fechaNacimiento.getFullYear()
                return edad >= 18 || "Debes ser mayor de edad"
              }
            })}
          />
          {errors.fechaNacimiento && (
            <span>{errors.fechaNAciemiento.message}</span>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            {...register("password", {
              required: {
                value: true,
                message: "Contraseña es requerida",
              },
              minLength: {
                value: 6,
                message: "Contraseña debe ser mayor a 6 caracteres",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <label>Consfirmar Password</label>
          <input
            type="password"
            name="confirmarPassword"
            {...register("confirmarPassword", {
              required: {
                value: true,
                message: "Password es requerida",
              },
              minLength: {
                value: 6,
                message: "Password es requerida",
              },
              validate: (value) =>
                value === password.current || "Password no coinciden",
            })}
          />
          {errors.confirmarPassword && (
            <span>{errors.confirmarPassword.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="pais">Pais:</label>
          <select name="pais" id="pais"{...register("pais")}>
            <option value="cl">Chile</option>
            <option value="mx">Mexico</option>
            <option value="co">Colombia</option>
            <option value="ar">Argentina</option>
          </select>

          {watch("pais") === "ar" && (
            <input 
            type="text"
            placeholder = "Provincia"
            {...register("provincia",{
              required:{
                value: true,
                message:"Provincia es requerida"
              },
            })} 
            />
          )}
        </div>

        <div>
          <label htmlFor="archivo">Subir Archivo</label>
          <input 
          type="file"
          onChange ={(e)=>{
            setValue("archivo", e.target.files[0].name)
          }} 
          />
          {errors.archivo && <span>{errors.archivo.message}</span>}
        </div>

        <div>
          <label>Acepto los terminos y condiciones</label>
          {errors.aceptaTerminos && <span>{errors.aceptaTerminos.message}</span>}
        </div>


        <button type="submit">Enviar</button>
        <pre style={{with:"400px" }}>{JSON.stringify(watch(),null,2)}</pre>
        <h3>Hello {watch("nombre")}</h3>
      </form>
    </>
  )
}

export default Formulario
