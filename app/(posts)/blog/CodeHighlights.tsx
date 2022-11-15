import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  value: any;
};
export default function CodeHighlights({ value }: Props) {
  return (
    <div>
      <div className="rounded-t-lg items-center flex justify-between font-mono from-cyan-600 py-1 px-2 to-cyan-400  bg-gradient-to-r w-full">
        {value.caption.length > 0 && (
          <div className="text-white font-mono font-semibold text-sm">
            {value.caption[0].plain_text}
          </div>
        )}
        {value.caption.length === 0 && <div></div>}
        <div className="text-sm text-white font-semibold">{value.language}</div>
      </div>
      <pre className="font-mono">
        <SyntaxHighlighter
          language={value.language}
          style={atomOneDark}
          customStyle={{
            backgroundColor: "#171717",
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
        >
          {value.rich_text[0].plain_text}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
}
