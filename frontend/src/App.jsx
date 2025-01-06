import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import { Helmet } from "react-helmet-async";
import { useGetfaviconQuery } from "./Redux/faviconApi";
import { useGetSEOQuery } from "./Redux/seoapi";
import { useEffect } from "react";
import useAuthCheck from "./Hook/useAuthCheck";

export default function App() {
  useAuthCheck();
  const { data: favicon } = useGetfaviconQuery();
  const icon = favicon?.data?.icon;

  const { data: seo } = useGetSEOQuery();
  const seoData = seo?.data;

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "${seoData?.custom?.google_tag_manager}");
    `;

    // Append the script to the head
    if (seoData?.custom?.google_tag_manager) document.head.appendChild(script);
  }, [seoData]);

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${import.meta.env.VITE_BACKEND_URL}/${icon}`}
        />

        <title>{seoData?.basic?.title || "Your Page Title"}</title>
        <meta
          name="description"
          content={seoData?.basic?.description || "Your Page Description"}
        />
        <meta
          name="keywords"
          content={seoData?.basic?.keywords || "Your Page Keywords"}
        />
        <meta
          name="author"
          content={seoData?.basic?.author || "Your Page Author"}
        />
        <meta
          name="designer"
          content={seoData?.basic?.designer || "Your Page Designer"}
        />
        <meta
          name="subject"
          content={seoData?.basic?.subject || "Your Page Subject"}
        />

        {seoData?.basic?.copyright && (
          <meta name="copyright" content={seoData?.basic?.copyright} />
        )}
        {seoData?.basic?.url && (
          <meta name="url" content={seoData?.basic?.url} />
        )}

        {seoData?.custom?.facebook_domain_verification && (
          <meta
            name="facebook-domain-verification"
            content={seoData?.custom?.facebook_domain_verification}
          />
        )}

        {seoData?.custom?.google_site_verification && (
          <meta
            name="google-site-verification"
            content={seoData?.custom?.google_site_verificatio}
          />
        )}
      </Helmet>

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${seoData?.custom?.google_tag_manager}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}
