<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>XML Sitemap – Invio</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #1e293b;
            background-color: #ffffff;
            padding: 20px 16px;
            line-height: 1.45;
            font-size: 13px;
          }
          .sitemap-wrap {
            max-width: 1080px;
            margin: 0 auto;
          }
          .sitemap-header {
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e2e8f0;
          }
          .sitemap-header h1 {
            font-size: 20px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 4px;
            letter-spacing: -0.01em;
          }
          .sitemap-header p {
            color: #64748b;
            font-size: 12.5px;
            line-height: 1.5;
          }
          .sitemap-header p a {
            color: #2563eb;
            text-decoration: none;
          }
          .sitemap-header p a:hover {
            text-decoration: underline;
          }

          /* Compact Toolbar (Section Dropper + Search) */
          .sitemap-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 10px;
            flex-wrap: wrap;
          }
          .toolbar-left {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }
          .toolbar-label {
            font-size: 12px;
            font-weight: 600;
            color: #475569;
          }
          .section-select {
            padding: 5px 28px 5px 8px;
            font-size: 12px;
            font-family: inherit;
            font-weight: 500;
            color: #0f172a;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            background: #ffffff url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748b'%3e%3cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3e%3c/svg%3e") no-repeat right 6px center;
            background-size: 14px;
            cursor: pointer;
            outline: none;
          }
          .section-select:focus {
            border-color: #2563eb;
          }
          .search-box {
            padding: 5px 8px;
            font-size: 12px;
            font-family: inherit;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            color: #0f172a;
            background: #ffffff;
            width: 200px;
            outline: none;
          }
          .search-box:focus {
            border-color: #2563eb;
          }
          .url-count {
            font-size: 12px;
            color: #64748b;
          }

          /* Tight Sheet / Table Layout */
          .table-container {
            width: 100%;
            overflow-x: auto;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 12.5px;
          }
          thead th {
            background: #f8fafc;
            color: #475569;
            font-weight: 600;
            font-size: 11.5px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            padding: 7px 10px;
            border-bottom: 1px solid #cbd5e1;
            white-space: nowrap;
          }
          tbody td {
            padding: 6px 10px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
          }
          tbody tr:nth-child(even) td {
            background-color: #fafafa;
          }
          tbody tr:hover td {
            background-color: #f1f5f9;
          }
          .col-num {
            width: 38px;
            text-align: center;
            color: #94a3b8;
            font-size: 11px;
          }
          .col-url {
            font-weight: 500;
            word-break: break-all;
          }
          .col-url a {
            color: #0f172a;
            text-decoration: none;
          }
          .col-url a:hover {
            color: #2563eb;
            text-decoration: underline;
          }
          .col-freq {
            width: 90px;
            color: #64748b;
            font-size: 11.5px;
            white-space: nowrap;
          }
          .col-prio {
            width: 70px;
            color: #64748b;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 11.5px;
            white-space: nowrap;
          }
          .col-lastmod {
            width: 105px;
            color: #64748b;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 11.5px;
            white-space: nowrap;
          }

          /* Clean Minimal Footer */
          .sitemap-footer {
            margin-top: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #94a3b8;
            font-size: 11.5px;
          }
          .sitemap-footer a {
            color: #64748b;
            text-decoration: none;
          }
          .sitemap-footer a:hover {
            color: #2563eb;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="sitemap-wrap">
          <div class="sitemap-header">
            <h1>XML Sitemap</h1>
            <p>
              Generated by Invio SEO, this is an XML Sitemap meant for consumption by search engines like Google or Bing.
              You can find more information about XML sitemaps on <a href="https://sitemaps.org" target="_blank" rel="noopener">sitemaps.org</a>.
            </p>
          </div>

          <!-- Filter Toolbar with Section Dropper -->
          <div class="sitemap-toolbar">
            <div class="toolbar-left">
              <label for="sectionFilter" class="toolbar-label">Section:</label>
              <select id="sectionFilter" class="section-select" onchange="filterSection(this.value)">
                <option value="all">All Sections (38 URLs)</option>
                <option value="core">Core Pages (6 URLs)</option>
                <option value="docs">Documentation Hub (14 URLs)</option>
                <option value="tools">Financial &amp; Tax Tools (10 URLs)</option>
                <option value="support">Help &amp; Support (3 URLs)</option>
                <option value="legal">Legal &amp; Compliance (5 URLs)</option>
              </select>
              <input type="text" id="searchInput" class="search-box" placeholder="Filter by URL path..." oninput="searchUrls(this.value)"/>
            </div>
            <div class="url-count">
              <span id="matchCount">Showing <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs</span>
            </div>
          </div>

          <!-- Tight Sheet Table -->
          <div class="table-container">
            <table id="sitemapTable">
              <thead>
                <tr>
                  <th class="col-num">#</th>
                  <th>URL</th>
                  <th class="col-freq">Changefreq</th>
                  <th class="col-prio">Priority</th>
                  <th class="col-lastmod">Last Mod.</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:variable name="loc" select="sitemap:loc"/>
                  <xsl:variable name="sec">
                    <xsl:choose>
                      <xsl:when test="starts-with($loc, 'https://invio.timrio.com/docs')">docs</xsl:when>
                      <xsl:when test="starts-with($loc, 'https://invio.timrio.com/tools')">tools</xsl:when>
                      <xsl:when test="$loc = 'https://invio.timrio.com/faq' or $loc = 'https://invio.timrio.com/contact' or $loc = 'https://invio.timrio.com/report-bug'">support</xsl:when>
                      <xsl:when test="$loc = 'https://invio.timrio.com/privacy-policy' or $loc = 'https://invio.timrio.com/terms' or $loc = 'https://invio.timrio.com/eula' or $loc = 'https://invio.timrio.com/cookie-policy' or $loc = 'https://invio.timrio.com/security'">legal</xsl:when>
                      <xsl:otherwise>core</xsl:otherwise>
                    </xsl:choose>
                  </xsl:variable>
                  <tr data-section="{$sec}">
                    <td class="col-num"><xsl:value-of select="position()"/></td>
                    <td class="col-url"><a href="{$loc}" target="_blank"><xsl:value-of select="$loc"/></a></td>
                    <td class="col-freq"><xsl:value-of select="sitemap:changefreq"/></td>
                    <td class="col-prio"><xsl:value-of select="sitemap:priority"/></td>
                    <td class="col-lastmod"><xsl:value-of select="sitemap:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="sitemap-footer">
            <div>Canonical origin: <a href="https://invio.timrio.com">https://invio.timrio.com</a></div>
            <div><a href="/">← Return to Invio Home</a></div>
          </div>
        </div>

        <script type="text/javascript">
          <![CDATA[
          function applyFilters() {
            var sectionSelect = document.getElementById('sectionFilter');
            var searchInput = document.getElementById('searchInput');
            var selectedSection = sectionSelect ? sectionSelect.value : 'all';
            var query = searchInput ? (searchInput.value || '').toLowerCase().trim() : '';

            var rows = document.querySelectorAll('#sitemapTable tbody tr');
            var visibleCount = 0;

            rows.forEach(function(row) {
              var rowSection = row.getAttribute('data-section');
              var urlText = (row.querySelector('.col-url') ? row.querySelector('.col-url').textContent : '').toLowerCase();

              var matchesSection = (selectedSection === 'all' || rowSection === selectedSection);
              var matchesQuery = (!query || urlText.indexOf(query) !== -1);

              if (matchesSection && matchesQuery) {
                row.style.display = '';
                visibleCount++;
              } else {
                row.style.display = 'none';
              }
            });

            var countEl = document.getElementById('matchCount');
            if (countEl) {
              countEl.textContent = 'Showing ' + visibleCount + ' of ' + rows.length + ' URLs';
            }
          }

          function filterSection() {
            applyFilters();
          }

          function searchUrls() {
            applyFilters();
          }
          ]]>
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
