"use client";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GrPowerReset } from "react-icons/gr";
import { Button } from "./ui/button";
import {
  boilerPlateCode,
  fixEncodingIssues,
  LANGUAGES,
  LANGUAGES_VERSIONS,
} from "@/constants/constants";
import { createSubmission } from "@/constants/createSubmission";
import { toast } from "sonner";
import NavBar from "./NavBar";

const Home = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState<string>(boilerPlateCode[language]);
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const editorRef = useRef(null);


  useEffect(() => {
    setCode(boilerPlateCode[language]);
  }, [language]);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    //@ts-ignore
    editorRef.current.focus();
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  async function handleRunCode() {
    const toastID = toast.loading("Running...");
    const result = await createSubmission(
      code,
      input,
      LANGUAGES_VERSIONS[language]
    );
    toast.dismiss(toastID);
    if (result.status == "Accepted") {
      //@ts-ignore
      setOutput(result?.output);
      toast.success("Code ran Successfully");
    } else {
      let fixedText = fixEncodingIssues(result.description as string);
      setOutput(fixedText);
      toast.error("An Error Occured");
    }
  }

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex flex-row bg-zinc-950 px-6">
        <div className="flex flex-col px-5 pt-12 w-1/2 space-y-4">
          <div className="flex flex-row justify-between">
            <div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={language}
                    className="font-semibold"
                  />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((k: string) => (
                    <SelectItem value={k} key={k}>
                      {k.charAt(0).toUpperCase() + k.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-12">
              <div className="flex items-center justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><p className="cursor-pointer" onClick={()=>{
                        setCode("");
                        setInput("");
                        setOutput("");
                    }}><GrPowerReset /></p></TooltipTrigger>
                    <TooltipContent>
                      <p>Reset to default</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Button onClick={handleRunCode}>Run Code</Button>
            </div>
          </div>
          <Editor
            height="75vh"
            width="50"
            theme="vs-dark"
            language={language}
            value={code}
            //@ts-ignore
            onChange={(value: string) => setCode(value)}
            onMount={handleEditorDidMount}
            className="border border-gray-700"
          />
        </div>
        <div className="flex flex-col px-24 pt-16 w-1/2 space-y-4">
          <label>Input</label>
          <textarea
            className="text-start  border border-gray-700 focus:outline-none h-1/2 p-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <label>Output</label>
          <textarea
            className="border border-gray-700 focus:outline-none h-1/2 p-1"
            value={output}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
