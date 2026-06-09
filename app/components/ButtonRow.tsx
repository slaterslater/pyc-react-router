import { Link } from "react-router";

export function ButtonRow({ buttons }: Buttons) {

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 w-full px-8">
      {buttons.map((button) => (
        <Link to="/" className="button btn-black min-w-[140px] sm:max-w-[220px] flex-1" key={button.text}>
          {button.text}
        </Link>
      ))}
    </div>
  )
}

type Buttons = {
  buttons: { text: string }[]
}