module.exports = {
    mode: "jit",
    purge: ['./resources/**/*.{js,jsx,ts,tsx,vue,blade.php}'],
    theme: {},
    variants: {},
    plugins: [],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        './resources/js/**/*.js',
    ],
}
