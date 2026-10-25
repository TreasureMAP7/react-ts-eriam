type TitleProps = {
  text: string
}

function Title({ text } : TitleProps) {
  return (
    <div>{text}</div>
  )
}

export default Title