/* eslint-disable react/prop-types */

export default function FormikInput({
  title,
  type,
  name,
  placeholder,
  inputRef,
  value,
  onBlur,
  onChange,
  error,
  touched,
  styles,
}) {
  return (
    <>
      <label className={styles.label}>
        <span>{title}:</span>
        <input
          className={`${styles.input} focus:outline-none focus:ring-gray-400 focus:ring-2 `}
          type={type}
          placeholder={placeholder}
          required
          ref={inputRef}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          name={name}
        />
        <div className="text-left  text-gray-600  -mt-10 mb-4 ml-2">
          <p className="font-medium text-gray-600 hover:text-gray-500 text-base ">
            {error && touched && error}
          </p>
        </div>
      </label>
    </>
  );
}
