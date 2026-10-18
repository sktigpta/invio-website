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

          /* Compact Toolbar (Section Dropper + Tree Actions + Search) */
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
          .tool-btn {
            padding: 5px 10px;
            font-size: 11.5px;
            font-weight: 500;
            color: #475569;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .tool-btn:hover {
            background: #f1f5f9;
            color: #0f172a;
            border-color: #94a3b8;
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
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            background: #ffffff;
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

          /* Collapsible Group Header Row */
          .group-header {
            background: #f1f5f9;
            cursor: pointer;
            user-select: none;
            border-top: 1px solid #cbd5e1;
            border-bottom: 1px solid #e2e8f0;
          }
          .group-header:hover {
            background: #e2e8f0;
          }
          .group-header td {
            padding: 6px 10px !important;
          }
          .group-header-inner {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
          }
          .tree-toggle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 14px;
            height: 14px;
            font-size: 10px;
            color: #475569;
            transition: transform 0.15s ease;
          }
          .folder-svg {
            color: #64748b;
            flex-shrink: 0;
          }
          .group-title {
            font-weight: 700;
            color: #0f172a;
            letter-spacing: -0.01em;
          }
          .group-badge {
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 11px;
            color: #475569;
            background: #e2e8f0;
            padding: 1px 6px;
            border-radius: 3px;
          }
          .group-count {
            font-size: 11px;
            color: #64748b;
            margin-left: auto;
          }
          .group-hint {
            font-size: 11px;
            color: #94a3b8;
            margin-left: 6px;
          }
          .group-hint-expanded { display: inline; }
          .group-hint-collapsed { display: none; }

          /* Collapsed state */
          .group-section.collapsed .tree-row {
            display: none !important;
          }
          .group-section.collapsed .tree-toggle {
            transform: rotate(-90deg);
          }
          .group-section.collapsed .group-header {
            border-bottom: 1px solid #cbd5e1;
          }
          .group-section.collapsed .group-hint-expanded { display: none; }
          .group-section.collapsed .group-hint-collapsed { display: inline; }

          /* Tree Row Styling */
          tbody tr.tree-row td {
            padding: 6px 10px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
          }
          tbody tr.tree-row:nth-child(even) td {
            background-color: #fafafa;
          }
          tbody tr.tree-row:hover td {
            background-color: #f1f5f9;
          }
          .col-num {
            width: 42px;
            text-align: center;
            color: #94a3b8;
            font-size: 11px;
          }
          .col-url {
            font-weight: 500;
            word-break: break-all;
          }
          .tree-branch {
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            color: #94a3b8;
            font-weight: 400;
            display: inline-block;
            width: 24px;
            user-select: none;
          }
          .col-url a {
            text-decoration: none;
          }
          .url-domain {
            color: #94a3b8;
            font-size: 12px;
          }
          .url-path {
            color: #0f172a;
            font-weight: 600;
            font-size: 12.5px;
          }
          .col-url a:hover .url-path {
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

          /* Minimal Footer */
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

          <!-- Filter Toolbar with Section Dropper, Tree Actions, and Live Filter -->
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
              <button type="button" class="tool-btn" onclick="expandAll()" title="Expand all tree groups">Expand All</button>
              <button type="button" class="tool-btn" onclick="collapseAll()" title="Collapse all tree groups">Collapse All</button>
              <input type="text" id="searchInput" class="search-box" placeholder="Filter by URL path..." oninput="searchUrls(this.value)"/>
            </div>
            <div class="url-count">
              <span id="matchCount">Showing 38 URLs across 5 groups</span>
            </div>
          </div>

          <!-- Tight Sheet Table with Collapsible Tree Groups -->
          <div class="table-container">
            <table id="sitemapTable">
              <thead>
                <tr>
                  <th class="col-num">#</th>
                  <th>URL (Tree Hierarchy)</th>
                  <th class="col-freq">Changefreq</th>
                  <th class="col-prio">Priority</th>
                  <th class="col-lastmod">Last Mod.</th>
                </tr>
              </thead>

              <!-- 1. Core Product & Conversion Pages -->
              <tbody class="group-section" id="group-core" data-group="core">
                <tr class="group-header" onclick="toggleGroup('core')">
                  <td colspan="5">
                    <div class="group-header-inner">
                      <span class="tree-toggle" id="toggle-icon-core">▼</span>
                      <svg class="folder-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                      </svg>
                      <span class="group-title">Core Product &amp; Navigation</span>
                      <span class="group-badge">/</span>
                      <span class="group-count">6 URLs</span>
                      <span class="group-hint group-hint-expanded">(click to collapse)</span>
                      <span class="group-hint group-hint-collapsed">(click to expand)</span>
                    </div>
                  </td>
                </tr>
                <xsl:for-each select="sitemap:urlset/sitemap:url[not(starts-with(sitemap:loc, 'https://invio.timrio.com/docs')) and not(starts-with(sitemap:loc, 'https://invio.timrio.com/tools')) and sitemap:loc != 'https://invio.timrio.com/faq' and sitemap:loc != 'https://invio.timrio.com/contact' and sitemap:loc != 'https://invio.timrio.com/report-bug' and sitemap:loc != 'https://invio.timrio.com/privacy-policy' and sitemap:loc != 'https://invio.timrio.com/terms' and sitemap:loc != 'https://invio.timrio.com/eula' and sitemap:loc != 'https://invio.timrio.com/cookie-policy' and sitemap:loc != 'https://invio.timrio.com/security']">
                  <xsl:call-template name="url-row">
                    <xsl:with-param name="sec" select="'core'"/>
                  </xsl:call-template>
                </xsl:for-each>
              </tbody>

              <!-- 2. Documentation Hub & Hardware Guides -->
              <tbody class="group-section" id="group-docs" data-group="docs">
                <tr class="group-header" onclick="toggleGroup('docs')">
                  <td colspan="5">
                    <div class="group-header-inner">
                      <span class="tree-toggle" id="toggle-icon-docs">▼</span>
                      <svg class="folder-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                      </svg>
                      <span class="group-title">Documentation &amp; Hardware Guides</span>
                      <span class="group-badge">/docs/*</span>
                      <span class="group-count">14 URLs</span>
                      <span class="group-hint group-hint-expanded">(click to collapse)</span>
                      <span class="group-hint group-hint-collapsed">(click to expand)</span>
                    </div>
                  </td>
                </tr>
                <xsl:for-each select="sitemap:urlset/sitemap:url[starts-with(sitemap:loc, 'https://invio.timrio.com/docs')]">
                  <xsl:call-template name="url-row">
                    <xsl:with-param name="sec" select="'docs'"/>
                  </xsl:call-template>
                </xsl:for-each>
              </tbody>

              <!-- 3. Free Financial & Tax Tools -->
              <tbody class="group-section" id="group-tools" data-group="tools">
                <tr class="group-header" onclick="toggleGroup('tools')">
                  <td colspan="5">
                    <div class="group-header-inner">
                      <span class="tree-toggle" id="toggle-icon-tools">▼</span>
                      <svg class="folder-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                      </svg>
                      <span class="group-title">Financial &amp; Tax Calculation Tools</span>
                      <span class="group-badge">/tools/*</span>
                      <span class="group-count">10 URLs</span>
                      <span class="group-hint group-hint-expanded">(click to collapse)</span>
                      <span class="group-hint group-hint-collapsed">(click to expand)</span>
                    </div>
                  </td>
                </tr>
                <xsl:for-each select="sitemap:urlset/sitemap:url[starts-with(sitemap:loc, 'https://invio.timrio.com/tools')]">
                  <xsl:call-template name="url-row">
                    <xsl:with-param name="sec" select="'tools'"/>
                  </xsl:call-template>
                </xsl:for-each>
              </tbody>

              <!-- 4. Help, Support & Feedback -->
              <tbody class="group-section" id="group-support" data-group="support">
                <tr class="group-header" onclick="toggleGroup('support')">
                  <td colspan="5">
                    <div class="group-header-inner">
                      <span class="tree-toggle" id="toggle-icon-support">▼</span>
                      <svg class="folder-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                      </svg>
                      <span class="group-title">Help, Support &amp; Bug Reporting</span>
                      <span class="group-badge">/support</span>
                      <span class="group-count">3 URLs</span>
                      <span class="group-hint group-hint-expanded">(click to collapse)</span>
                      <span class="group-hint group-hint-collapsed">(click to expand)</span>
                    </div>
                  </td>
                </tr>
                <xsl:for-each select="sitemap:urlset/sitemap:url[sitemap:loc = 'https://invio.timrio.com/faq' or sitemap:loc = 'https://invio.timrio.com/contact' or sitemap:loc = 'https://invio.timrio.com/report-bug']">
                  <xsl:call-template name="url-row">
                    <xsl:with-param name="sec" select="'support'"/>
                  </xsl:call-template>
                </xsl:for-each>
              </tbody>

              <!-- 5. Legal & Compliance Policies -->
              <tbody class="group-section" id="group-legal" data-group="legal">
                <tr class="group-header" onclick="toggleGroup('legal')">
                  <td colspan="5">
                    <div class="group-header-inner">
                      <span class="tree-toggle" id="toggle-icon-legal">▼</span>
                      <svg class="folder-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                      </svg>
                      <span class="group-title">Legal, Trust &amp; Privacy Policies</span>
                      <span class="group-badge">/legal</span>
                      <span class="group-count">5 URLs</span>
                      <span class="group-hint group-hint-expanded">(click to collapse)</span>
                      <span class="group-hint group-hint-collapsed">(click to expand)</span>
                    </div>
                  </td>
                </tr>
                <xsl:for-each select="sitemap:urlset/sitemap:url[sitemap:loc = 'https://invio.timrio.com/privacy-policy' or sitemap:loc = 'https://invio.timrio.com/terms' or sitemap:loc = 'https://invio.timrio.com/eula' or sitemap:loc = 'https://invio.timrio.com/cookie-policy' or sitemap:loc = 'https://invio.timrio.com/security']">
                  <xsl:call-template name="url-row">
                    <xsl:with-param name="sec" select="'legal'"/>
                  </xsl:call-template>
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
          function toggleGroup(groupId) {
            var tbody = document.getElementById('group-' + groupId);
            if (tbody) {
              tbody.classList.toggle('collapsed');
            }
          }

          function expandAll() {
            var groups = document.querySelectorAll('.group-section');
            groups.forEach(function(g) {
              g.classList.remove('collapsed');
            });
          }

          function collapseAll() {
            var groups = document.querySelectorAll('.group-section');
            groups.forEach(function(g) {
              g.classList.add('collapsed');
            });
          }

          function filterSection(val) {
            var groups = document.querySelectorAll('.group-section');
            var searchInput = document.getElementById('searchInput');
            var query = searchInput ? (searchInput.value || '').toLowerCase().trim() : '';

            groups.forEach(function(g) {
              var groupId = g.getAttribute('data-group');
              if (val === 'all' || groupId === val) {
                g.style.display = '';
                if (val !== 'all') {
                  g.classList.remove('collapsed');
                }
              } else {
                g.style.display = 'none';
              }
            });

            if (query) {
              searchUrls(query);
            } else {
              updateCount();
            }
          }

          function searchUrls(query) {
            query = (query || '').toLowerCase().trim();
            var sectionSelect = document.getElementById('sectionFilter');
            var selectedSection = sectionSelect ? sectionSelect.value : 'all';

            var groups = document.querySelectorAll('.group-section');
            var visibleCount = 0;

            groups.forEach(function(g) {
              var groupId = g.getAttribute('data-group');
              var inSection = (selectedSection === 'all' || groupId === selectedSection);

              if (!inSection) {
                g.style.display = 'none';
                return;
              }

              var rows = g.querySelectorAll('.tree-row');
              var matchedInGroup = 0;

              rows.forEach(function(row) {
                var urlText = (row.querySelector('.col-url') ? row.querySelector('.col-url').textContent : '').toLowerCase();
                if (!query || urlText.indexOf(query) !== -1) {
                  row.style.display = '';
                  matchedInGroup++;
                  visibleCount++;
                } else {
                  row.style.display = 'none';
                }
              });

              if (query) {
                if (matchedInGroup > 0) {
                  g.style.display = '';
                  g.classList.remove('collapsed');
                } else {
                  g.style.display = 'none';
                }
              } else {
                g.style.display = '';
              }
            });

            var countEl = document.getElementById('matchCount');
            if (countEl) {
              if (query) {
                countEl.textContent = 'Found ' + visibleCount + ' matching URL' + (visibleCount === 1 ? '' : 's');
              } else {
                updateCount();
              }
            }
          }

          function updateCount() {
            var sectionSelect = document.getElementById('sectionFilter');
            var selectedSection = sectionSelect ? sectionSelect.value : 'all';
            var countEl = document.getElementById('matchCount');
            if (!countEl) return;

            if (selectedSection === 'all') {
              countEl.textContent = 'Showing 38 URLs across 5 groups';
            } else {
              var targetGroup = document.getElementById('group-' + selectedSection);
              var num = targetGroup ? targetGroup.querySelectorAll('.tree-row').length : 0;
              countEl.textContent = 'Showing ' + num + ' URLs in selected section';
            }
          }
          ]]>
        </script>
      </body>
    </html>
  </xsl:template>

  <!-- Reusable Template for Tree Rows -->
  <xsl:template name="url-row">
    <xsl:param name="sec"/>
    <xsl:variable name="loc" select="sitemap:loc"/>
    <tr class="tree-row" data-section="{$sec}">
      <td class="col-num"><xsl:value-of select="count(preceding::sitemap:url) + 1"/></td>
      <td class="col-url">
        <span class="tree-branch">
          <xsl:choose>
            <xsl:when test="position() = last()">└── </xsl:when>
            <xsl:otherwise>├── </xsl:otherwise>
          </xsl:choose>
        </span>
        <a href="{$loc}" target="_blank">
          <span class="url-domain">https://invio.timrio.com</span>
          <span class="url-path">
            <xsl:choose>
              <xsl:when test="$loc = 'https://invio.timrio.com/'">/</xsl:when>
              <xsl:otherwise><xsl:value-of select="substring-after($loc, 'https://invio.timrio.com')"/></xsl:otherwise>
            </xsl:choose>
          </span>
        </a>
      </td>
      <td class="col-freq"><xsl:value-of select="sitemap:changefreq"/></td>
      <td class="col-prio"><xsl:value-of select="sitemap:priority"/></td>
      <td class="col-lastmod"><xsl:value-of select="sitemap:lastmod"/></td>
    </tr>
  </xsl:template>
</xsl:stylesheet>
