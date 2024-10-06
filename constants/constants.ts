export const LANGUAGES_VERSIONS:Record<string,number> = {
    "go": 95,
    "cpp": 54,
    "java": 91,
    "javascript": 93,
    "python": 70,
    "rust": 73,
    "typescript": 101,
};

export const LANGUAGES : string[] = Object.keys(LANGUAGES_VERSIONS);

export const boilerPlateCode: { [language: string]: string } = {
    "go": `package main
  import "fmt"
  func main() {
      fmt.Println("Welcome to QuickIDE")
  }`,
    
    "cpp": `#include <iostream>
  int main() {
      std::cout << "Welcome to QuickIDE" << std::endl;
      return 0;
  }`,
    
    "java": `public class Main {
      public static void main(String[] args) {
          System.out.println("Welcome to QuickIDE");
      }
  }`,
    
    "javascript": `console.log("Welcome to QuickIDE");`,
    
    "typescript": `console.log("Welcome to QuickIDE");`,
    
    "python": `print("Welcome to QuickIDE")`,
    
    "rust": `fn main() {
      println!("Welcome to QuickIDE");
  }`
  };
  
  


  export function fixEncodingIssues(text: string): string {
    return text
      .replace(/â/g, '‘')
      .replace(/â/g, '’')
      .replace(/â/g, '“')
      .replace(/â/g, '”')
      .replace(/â¢/g, '•');
  }