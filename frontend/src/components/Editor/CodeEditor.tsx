"use client";

// React Libraries
import Editor from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { CodeSnippetType } from "@/types/types";

type CodeEditorProps = {
  codeSnippets: CodeSnippetType[];
};

export default function CodeEditor({ codeSnippets }: CodeEditorProps) {
  // State for keeping track of the code and language
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("// Please select a language");

  // To get the editor instance and to focus the editor
  const editorRef = useRef(null);

  console.log("(CodeEditor.tsx) codeSnippets", codeSnippets); // debug

  // To get the editor instance
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor; // To get the editor instance
    editor.focus(); // To focus the editor
  }

  function handleSelectLanguage(language: string) {
    setLanguage(language);
  }

  return (
    <div>
      <LanguageSelector
        language={language}
        onSelectLanguage={handleSelectLanguage}
      />
      <Editor
        height="52vh"
        theme="vs-dark"
        value={code}
        language={language}
        defaultValue={code}
        onMount={handleEditorDidMount}
        onChange={(newValue) => setCode(newValue || "")}
      />
    </div>
  );
}
