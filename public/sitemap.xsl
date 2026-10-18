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
        <title>XML Sitemap – Invio by Timrio</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            padding: 32px 16px;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
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
            width: 36px;
            height: 36px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(124, 58, 237, 0.15);
          }
          .brand h1 {
            font-size: 24px;
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
            padding: 3px 10px;
            border-radius: 9999px;
            background: #f3e8ff;
            color: #7c3aed;
            border: 1px solid #e9d5ff;
          }
          p.intro {
            color: #475569;
            font-size: 13.5px;
            max-width: 820px;
            line-height: 1.6;
          }
          .meta-stats {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 18px;
            font-size: 12.5px;
            color: #64748b;
            padding-top: 14px;
            border-top: 1px solid #f1f5f9;
          }
          .meta-stats strong {
            color: #0f172a;
          }

          /* Interactive Header Dropper Toolbar */
          .toolbar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            padding: 16px 32px;
            background-color: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }
          .toolbar-left, .toolbar-right {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
          }
          .dropper-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .dropper-label {
            font-size: 12px;
            font-weight: 600;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }
          .dropper-select {
            appearance: none;
            -webkit-appearance: none;
            background: #ffffff url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236b7280'%3e%3cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3e%3c/svg%3e") no-repeat right 10px center;
            background-size: 16px;
            padding: 7px 34px 7px 12px;
            font-size: 13px;
            font-weight: 600;
            color: #0f172a;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            cursor: pointer;
            outline: none;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04);
            transition: all 0.15s ease;
          }
          .dropper-select:hover {
            border-color: #7c3aed;
          }
          .dropper-select:focus {
            border-color: #7c3aed;
            box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
          }
          .search-input {
            padding: 7px 12px;
            font-size: 13px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            outline: none;
            background: #ffffff;
            color: #0f172a;
            width: 220px;
            transition: all 0.15s ease;
          }
          .search-input:focus {
            border-color: #7c3aed;
            box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
          }
          .btn-action {
            padding: 7px 12px;
            font-size: 12px;
            font-weight: 600;
            background: #ffffff;
            color: #475569;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .btn-action:hover {
            background: #f1f5f9;
            color: #0f172a;
            border-color: #94a3b8;
          }

          /* Tree Structure Layout */
          .tree-view {
            padding: 24px 32px;
          }
          .tree-root-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(90deg, #faf5ff 0%, #ffffff 100%);
            border: 1px solid #e9d5ff;
            border-radius: 12px;
            padding: 14px 20px;
            margin-bottom: 24px;
          }
          .tree-root-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .root-badge {
            background: #7c3aed;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 3px 8px;
            border-radius: 6px;
          }
          .root-url {
            font-weight: 700;
            font-size: 15px;
            color: #0f172a;
            text-decoration: none;
          }
          .root-url:hover {
            text-decoration: underline;
            color: #7c3aed;
          }

          /* Collapsible Branch (Dropper Accordion) */
          details.tree-branch {
            margin-bottom: 16px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            background: #ffffff;
            overflow: hidden;
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
          }
          details.tree-branch[open] {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
            border-color: #cbd5e1;
          }
          summary.branch-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 18px;
            background: #f8fafc;
            cursor: pointer;
            user-select: none;
            outline: none;
            font-size: 14px;
            font-weight: 700;
            color: #1e293b;
            list-style: none;
            transition: background 0.15s ease;
          }
          summary.branch-header::-webkit-details-marker {
            display: none;
          }
          summary.branch-header:hover {
            background: #f1f5f9;
          }
          .branch-left {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .chevron {
            display: inline-block;
            font-size: 12px;
            color: #7c3aed;
            transition: transform 0.2s ease;
          }
          details[open] summary .chevron {
            transform: rotate(90deg);
          }
          .category-title {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
          }
          .branch-pattern {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 11.5px;
            font-weight: 600;
            color: #7c3aed;
            background: #f3e8ff;
            padding: 2px 8px;
            border-radius: 6px;
          }
          .branch-count {
            font-size: 11px;
            font-weight: 600;
            background: #e2e8f0;
            color: #475569;
            padding: 2px 8px;
            border-radius: 9999px;
          }

          /* Tree Leaf Nodes and Table */
          .branch-tree-list {
            padding: 4px 0;
            border-top: 1px solid #f1f5f9;
          }
          .tree-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 18px 10px 32px;
            position: relative;
            border-bottom: 1px solid #f8fafc;
            font-size: 13px;
            transition: background-color 0.1s ease;
          }
          .tree-row:last-child {
            border-bottom: none;
          }
          .tree-row:hover {
            background-color: #f8fafc;
          }
          .tree-row::before {
            content: "";
            position: absolute;
            left: 18px;
            top: 0;
            bottom: 50%;
            width: 1px;
            border-left: 2px solid #cbd5e1;
          }
          .tree-row::after {
            content: "";
            position: absolute;
            left: 18px;
            top: 50%;
            width: 8px;
            border-top: 2px solid #cbd5e1;
          }
          .tree-row-left {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            min-width: 0;
          }
          .node-icon {
            color: #94a3b8;
            font-size: 14px;
            flex-shrink: 0;
          }
          .url-link {
            font-weight: 600;
            color: #7c3aed;
            text-decoration: none;
            word-break: break-all;
          }
          .url-link:hover {
            text-decoration: underline;
            color: #5b21b6;
          }
          .tree-row-right {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
            font-size: 12px;
            color: #64748b;
          }
          .changefreq-pill {
            font-size: 11px;
            font-weight: 600;
            padding: 2px 7px;
            border-radius: 6px;
            text-transform: capitalize;
            background: #f1f5f9;
            color: #475569;
          }
          .priority-pill {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            font-family: ui-monospace, SFMono-Regular, monospace;
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
          .priority-low {
            background: #f8fafc;
            color: #64748b;
            border: 1px solid #e2e8f0;
          }
          .lastmod-text {
            color: #64748b;
            font-size: 11.5px;
            font-family: ui-monospace, SFMono-Regular, monospace;
          }

          footer {
            padding: 20px 32px;
            border-top: 1px solid #e2e8f0;
            background: #fafafa;
            font-size: 12.5px;
            color: #64748b;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
          }
          footer a {
            color: #7c3aed;
            text-decoration: none;
            font-weight: 600;
          }
          footer a:hover {
            text-decoration: underline;
          }

          @media (max-width: 768px) {
            body { padding: 12px 8px; }
            header, .toolbar, .tree-view, footer { padding-left: 16px; padding-right: 16px; }
            .tree-row { flex-direction: column; align-items: flex-start; gap: 6px; }
            .tree-row-right { margin-left: 24px; }
            .search-input { width: 100%; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="brand">
              <img src="/appLogo.png" alt="Invio" class="brand-logo"/>
              <h1>Invio XML Sitemap</h1>
              <span class="badge">Official Canonical Index</span>
            </div>
            <p class="intro">
              This interactive visual sitemap organizes all <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> canonical routes for Invio Desktop Invoicing into a browsable hierarchical tree. Use the dropdown header below to filter categories or collapse branches.
            </p>
            <div class="meta-stats">
              <div>Total Indexed URLs: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></div>
              <div>Last Audit: <strong>2026-10-18</strong></div>
              <div>Canonical Domain: <strong>https://invio.timrio.com</strong></div>
              <div>Protocol: <strong>Sitemaps.org 0.9 XML Schema</strong></div>
            </div>
          </header>

          <!-- Dropper & Filter Toolbar -->
          <div class="toolbar">
            <div class="toolbar-left">
              <div class="dropper-wrapper">
                <label for="categoryDropper" class="dropper-label">Section Dropper:</label>
                <select id="categoryDropper" class="dropper-select" onchange="filterBranch(this.value)">
                  <option value="all">🌳 All Sections (Full Tree)</option>
                  <option value="branch-core">🏢 Core Product &amp; Conversion (6 URLs)</option>
                  <option value="branch-docs">📚 Documentation &amp; Setup Guides (14 URLs)</option>
                  <option value="branch-tools">🧮 Free Financial &amp; Tax Tools (10 URLs)</option>
                  <option value="branch-support">💬 Help, Support &amp; Feedback (3 URLs)</option>
                  <option value="branch-legal">⚖️ Legal, Security &amp; Compliance (5 URLs)</option>
                </select>
              </div>
              <button class="btn-action" onclick="toggleAllBranches(true)">Expand All</button>
              <button class="btn-action" onclick="toggleAllBranches(false)">Collapse All</button>
            </div>
            <div class="toolbar-right">
              <input type="text" id="routeSearch" class="search-input" placeholder="Search routes or tools..." oninput="searchRoutes(this.value)"/>
            </div>
          </div>

          <div class="tree-view">
            <!-- Root Host Card -->
            <div class="tree-root-card">
              <div class="tree-root-left">
                <span class="root-badge">Root Origin</span>
                <a href="https://invio.timrio.com/" class="root-url">https://invio.timrio.com</a>
              </div>
              <div>
                <span class="changefreq-pill">Production Apex Host</span>
              </div>
            </div>

            <!-- ============================================== -->
            <!-- 1. Core Product & Conversion Pages             -->
            <!-- ============================================== -->
            <details class="tree-branch" id="branch-core" open="open">
              <summary class="branch-header">
                <div class="branch-left">
                  <span class="chevron">▶</span>
                  <span>🏢</span>
                  <span class="category-title">Core Product &amp; Conversion Pages</span>
                  <span class="branch-pattern">/*</span>
                </div>
                <div>
                  <span class="branch-count">6 Pages</span>
                </div>
              </summary>
              <div class="branch-tree-list">
                <xsl:for-each select="sitemap:urlset/sitemap:url[
                  sitemap:loc = 'https://invio.timrio.com/' or
                  sitemap:loc = 'https://invio.timrio.com/features' or
                  sitemap:loc = 'https://invio.timrio.com/pricing' or
                  sitemap:loc = 'https://invio.timrio.com/download' or
                  sitemap:loc = 'https://invio.timrio.com/checkout' or
                  sitemap:loc = 'https://invio.timrio.com/changelog'
                ]">
                  <div class="tree-row">
                    <div class="tree-row-left">
                      <span class="node-icon">📄</span>
                      <a href="{sitemap:loc}" class="url-link" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </div>
                    <div class="tree-row-right">
                      <span class="changefreq-pill"><xsl:value-of select="sitemap:changefreq"/></span>
                      <span class="priority-pill priority-high"><xsl:value-of select="sitemap:priority"/></span>
                      <span class="lastmod-text"><xsl:value-of select="sitemap:lastmod"/></span>
                    </div>
                  </div>
                </xsl:for-each>
              </div>
            </details>

            <!-- ============================================== -->
            <!-- 2. Documentation Hub & Hardware Setup Guides   -->
            <!-- ============================================== -->
            <details class="tree-branch" id="branch-docs" open="open">
              <summary class="branch-header">
                <div class="branch-left">
                  <span class="chevron">▶</span>
                  <span>📚</span>
                  <span class="category-title">Documentation Hub &amp; Hardware Guides</span>
                  <span class="branch-pattern">/docs/*</span>
                </div>
                <div>
                  <span class="branch-count">14 Pages</span>
                </div>
              </summary>
              <div class="branch-tree-list">
                <xsl:for-each select="sitemap:urlset/sitemap:url[starts-with(sitemap:loc, 'https://invio.timrio.com/docs')]">
                  <div class="tree-row">
                    <div class="tree-row-left">
                      <span class="node-icon">📄</span>
                      <a href="{sitemap:loc}" class="url-link" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </div>
                    <div class="tree-row-right">
                      <span class="changefreq-pill"><xsl:value-of select="sitemap:changefreq"/></span>
                      <span class="priority-pill priority-high"><xsl:value-of select="sitemap:priority"/></span>
                      <span class="lastmod-text"><xsl:value-of select="sitemap:lastmod"/></span>
                    </div>
                  </div>
                </xsl:for-each>
              </div>
            </details>

            <!-- ============================================== -->
            <!-- 3. Free Financial & Tax Tools Suite            -->
            <!-- ============================================== -->
            <details class="tree-branch" id="branch-tools" open="open">
              <summary class="branch-header">
                <div class="branch-left">
                  <span class="chevron">▶</span>
                  <span>🧮</span>
                  <span class="category-title">Free Financial &amp; Tax Tools Suite</span>
                  <span class="branch-pattern">/tools/*</span>
                </div>
                <div>
                  <span class="branch-count">10 Pages</span>
                </div>
              </summary>
              <div class="branch-tree-list">
                <xsl:for-each select="sitemap:urlset/sitemap:url[starts-with(sitemap:loc, 'https://invio.timrio.com/tools')]">
                  <div class="tree-row">
                    <div class="tree-row-left">
                      <span class="node-icon">📄</span>
                      <a href="{sitemap:loc}" class="url-link" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </div>
                    <div class="tree-row-right">
                      <span class="changefreq-pill"><xsl:value-of select="sitemap:changefreq"/></span>
                      <span class="priority-pill priority-high"><xsl:value-of select="sitemap:priority"/></span>
                      <span class="lastmod-text"><xsl:value-of select="sitemap:lastmod"/></span>
                    </div>
                  </div>
                </xsl:for-each>
              </div>
            </details>

            <!-- ============================================== -->
            <!-- 4. Help, Support & Feedback                    -->
            <!-- ============================================== -->
            <details class="tree-branch" id="branch-support" open="open">
              <summary class="branch-header">
                <div class="branch-left">
                  <span class="chevron">▶</span>
                  <span>💬</span>
                  <span class="category-title">Help, Support &amp; Feedback</span>
                  <span class="branch-pattern">/faq, /contact, /report-bug</span>
                </div>
                <div>
                  <span class="branch-count">3 Pages</span>
                </div>
              </summary>
              <div class="branch-tree-list">
                <xsl:for-each select="sitemap:urlset/sitemap:url[
                  sitemap:loc = 'https://invio.timrio.com/faq' or
                  sitemap:loc = 'https://invio.timrio.com/contact' or
                  sitemap:loc = 'https://invio.timrio.com/report-bug'
                ]">
                  <div class="tree-row">
                    <div class="tree-row-left">
                      <span class="node-icon">📄</span>
                      <a href="{sitemap:loc}" class="url-link" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </div>
                    <div class="tree-row-right">
                      <span class="changefreq-pill"><xsl:value-of select="sitemap:changefreq"/></span>
                      <span class="priority-pill priority-med"><xsl:value-of select="sitemap:priority"/></span>
                      <span class="lastmod-text"><xsl:value-of select="sitemap:lastmod"/></span>
                    </div>
                  </div>
                </xsl:for-each>
              </div>
            </details>

            <!-- ============================================== -->
            <!-- 5. Legal, Security & Compliance                -->
            <!-- ============================================== -->
            <details class="tree-branch" id="branch-legal" open="open">
              <summary class="branch-header">
                <div class="branch-left">
                  <span class="chevron">▶</span>
                  <span>⚖️</span>
                  <span class="category-title">Legal, Security &amp; Compliance Policies</span>
                  <span class="branch-pattern">/privacy-policy, /terms, /eula...</span>
                </div>
                <div>
                  <span class="branch-count">5 Pages</span>
                </div>
              </summary>
              <div class="branch-tree-list">
                <xsl:for-each select="sitemap:urlset/sitemap:url[
                  sitemap:loc = 'https://invio.timrio.com/privacy-policy' or
                  sitemap:loc = 'https://invio.timrio.com/terms' or
                  sitemap:loc = 'https://invio.timrio.com/eula' or
                  sitemap:loc = 'https://invio.timrio.com/cookie-policy' or
                  sitemap:loc = 'https://invio.timrio.com/security'
                ]">
                  <div class="tree-row">
                    <div class="tree-row-left">
                      <span class="node-icon">📄</span>
                      <a href="{sitemap:loc}" class="url-link" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </div>
                    <div class="tree-row-right">
                      <span class="changefreq-pill"><xsl:value-of select="sitemap:changefreq"/></span>
                      <span class="priority-pill priority-low"><xsl:value-of select="sitemap:priority"/></span>
                      <span class="lastmod-text"><xsl:value-of select="sitemap:lastmod"/></span>
                    </div>
                  </div>
                </xsl:for-each>
              </div>
            </details>
          </div>

          <footer>
            <div>© 2026 Timrio. All rights reserved. Invio Desktop GST Invoicing.</div>
            <div>
              <a href="/">← Return to Invio Home</a>
            </div>
          </footer>
        </div>

        <script type="text/javascript">
          <![CDATA[
          function filterBranch(targetId) {
            var branches = document.querySelectorAll('.tree-branch');
            branches.forEach(function(branch) {
              if (targetId === 'all') {
                branch.style.display = '';
                branch.setAttribute('open', 'open');
              } else if (branch.id === targetId) {
                branch.style.display = '';
                branch.setAttribute('open', 'open');
                branch.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              } else {
                branch.style.display = 'none';
              }
            });
          }

          function toggleAllBranches(openState) {
            var branches = document.querySelectorAll('.tree-branch');
            branches.forEach(function(branch) {
              if (openState) {
                branch.setAttribute('open', 'open');
              } else {
                branch.removeAttribute('open');
              }
            });
          }

          function searchRoutes(query) {
            var term = (query || '').toLowerCase().trim();
            var rows = document.querySelectorAll('.tree-row');
            var branches = document.querySelectorAll('.tree-branch');

            if (!term) {
              rows.forEach(function(r) { r.style.display = ''; });
              branches.forEach(function(b) { b.style.display = ''; });
              return;
            }

            branches.forEach(function(branch) {
              var branchRows = branch.querySelectorAll('.tree-row');
              var branchHasMatch = false;

              branchRows.forEach(function(row) {
                var text = (row.textContent || '').toLowerCase();
                if (text.indexOf(term) !== -1) {
                  row.style.display = '';
                  branchHasMatch = true;
                } else {
                  row.style.display = 'none';
                }
              });

              if (branchHasMatch) {
                branch.style.display = '';
                branch.setAttribute('open', 'open');
              } else {
                branch.style.display = 'none';
              }
            });
          }
          ]]>
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
