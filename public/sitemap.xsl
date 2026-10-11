<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>XML Sitemap – Invio by Timrio</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            padding: 32px 16px;
            line-height: 1.5;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }
          header {
            padding: 28px 32px;
            border-bottom: 1px solid #e2e8f0;
            background: linear-gradient(180deg, #faf5ff 0%, #ffffff 100%);
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
          }
          .brand-logo {
            width: 32px;
            height: 32px;
            border-radius: 8px;
          }
          .brand h1 {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.02em;
          }
          .badge {
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 2px 8px;
            border-radius: 9999px;
            background: #f3e8ff;
            color: #7c3aed;
            border: 1px solid #e9d5ff;
          }
          p.intro {
            color: #475569;
            font-size: 13px;
            max-width: 720px;
          }
          .meta-stats {
            display: flex;
            gap: 20px;
            margin-top: 16px;
            font-size: 12px;
            color: #64748b;
          }
          .meta-stats strong {
            color: #0f172a;
          }
          .table-wrapper {
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            text-align: left;
          }
          thead th {
            background: #f8fafc;
            color: #475569;
            font-weight: 600;
            padding: 12px 24px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          tbody tr {
            border-bottom: 1px solid #f1f5f9;
            transition: background-color 0.15s ease;
          }
          tbody tr:hover {
            background-color: #f8fafc;
          }
          tbody td {
            padding: 12px 24px;
            color: #334155;
          }
          td.url-cell a {
            color: #7c3aed;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          td.url-cell a:hover {
            text-decoration: underline;
          }
          .priority-pill {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            background: #f1f5f9;
            color: #334155;
          }
          .priority-high {
            background: #ecfdf5;
            color: #059669;
            border: 1px solid #a7f3d0;
          }
          .priority-med {
            background: #f5f3ff;
            color: #7c3aed;
            border: 1px solid #ddd6fe;
          }
          footer {
            padding: 20px 32px;
            border-top: 1px solid #e2e8f0;
            background: #fafafa;
            font-size: 12px;
            color: #64748b;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: gap;
          }
          footer a {
            color: #7c3aed;
            text-decoration: none;
            font-weight: 600;
          }
          footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="brand">
              <img src="/appLogo.png" alt="Invio" class="brand-logo"/>
              <h1>Invio XML Sitemap</h1>
              <span class="badge">Official Index</span>
            </div>
            <p class="intro">
              This is the official XML Sitemap for Invio desktop invoicing software by Timrio. It is structured for search engine crawlers (Google, Bing, DuckDuckGo) to discover and index all canonical pages, guides, tools, and releases.
            </p>
            <div class="meta-stats">
              <div>Total URLs: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></div>
              <div>Generated: <strong>2026-10-11</strong></div>
              <div>Host: <strong>https://invio.timrio.com</strong></div>
            </div>
          </header>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 55%;">URL Location</th>
                  <th style="width: 15%;">Last Modified</th>
                  <th style="width: 15%;">Change Frequency</th>
                  <th style="width: 15%;">Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td class="url-cell">
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                    <td>
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td>
                      <span class="priority-pill">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <footer>
            <div>© 2026 Timrio. All rights reserved. Invio Desktop Invoicing.</div>
            <div>
              <a href="/">← Return to Invio Home</a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
