type themeProps = {
    content: string;
}
const ThemeSection: React.FC<themeProps> = ({ content }) => {
  return (
    <div className='mx-auto w-full max-w-md'>
        <p className='text-center text-lg lg:text-md'>{content}</p>
    </div>
  )
}

export default ThemeSection