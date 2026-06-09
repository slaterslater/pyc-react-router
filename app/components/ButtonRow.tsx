import { Link } from "react-router";

export function ButtonRow({ buttons }: Buttons) {

  return (
    <div className={`grid grid-cols-${buttons.length} gap-4 justify-around w-full px-6`}>
      {buttons.map((button) => (
        <Link to="/" className="mbo-button" key={button.text}>{button.text}</Link>
      ))}
    </div>
  )
}

type Buttons = {
  buttons: { text: string }[]
}