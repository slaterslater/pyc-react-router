import { Link } from "react-router";

export function ButtonRow({ buttons }: Buttons) {

  // console.log({ buttons })
  return (
    <div className="flex gap-6 justify-around w-full p-8">
      {buttons.map((button) => (
        <Link to="/" className="btn-black flex-1" key={button.text}>{button.text}</Link>
      ))}
    </div>
  )
}

type Buttons = {
  buttons: { text: string }[]
}