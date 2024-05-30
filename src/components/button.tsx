"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FaSpinner, FaDownload } from "react-icons/fa";

interface Data {
  id: string;
}

export default function ButtonPage({ id }: Data) {
  const button = useTranslations("Button");
  const name = button("name");
  const load = button("load");
  const convert = button("convert");

  const [isTitle, setIsTitle] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInit = async () => {
      try {
        const apiUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
        const apiInfo = await fetch(apiUrl);
        const { title } = await apiInfo.json();
        document.title = title; //ponemos el titulo al boton
        setIsTitle(title);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchInit();
  }, [id]);

  const handleClick = async () => {
    setIsClicked(true);
    try {
      const response = await fetch(
        `https://apis.noimgs.net/yt/convert?id=${id}`
      );

      const { error, url } = await response.json();

      if (error) {
        window.location.reload(); // Recargar la página en caso de error
        return;
      }

      if (typeof window !== "undefined") {
        // Verificar si estamos en el navegador
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = url;
        document.body.appendChild(iframe);
        iframe.onload = () => {
          document.body.removeChild(iframe);
        };
        iframe.onerror = () => {
          document.body.removeChild(iframe);
        };
      }

      setIsClicked(false);
    } catch (error) {}
  };

  return (
    <div className="st">
      <button className="l" onClick={() => handleClick()}>
        <span>
          {isClicked ? (
            <b>
              <FaSpinner className="spin" />
              <u>{convert}</u>
            </b>
          ) : (
            <b className="pulse">
              <FaDownload />
              <u>{name}</u>
            </b>
          )}

          {isloading ? (
            <i className="ld">{load}</i>
          ) : (
            <i className="parpadeo">{isTitle}</i>
          )}
        </span>
      </button>
    </div>
  );
}
