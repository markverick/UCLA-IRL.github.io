---
layout: default
title: Theses
section_id: theses
---

<div class="full parallax" style="background-image: url(images/banner/banner.jpg); color: var(--color-text-on-dark);">
  <div class="row">
    <div class="large-12 columns">
      {% include section-header.html title="Theses" tagline="" class="big" %}
    </div>
  </div>
  <div class="four spacing"></div>
</div>

<div class="row" style="margin-top: 20px;">
  <h2>COPYRIGHT NOTICE</h2>

  <p>The documents here are provided as a means to ensure timely dissemination of technical work on a noncommercial basis. Copyright and all rights therein are maintained by the authors or by other copyright holders. It is understood that anyone copying the papers from this page will adhere to the terms and constraints invoked by the copyright.</p>

  <hr />
</div>

<div class="row">

Over the years, the IRL has produced many accomplished Ph.D. graduates.
All dissertations from IRL Ph.D. graduates are listed herein, with dissertation defense slides also linked when available.<br />
<br />

{% assign current_year = site.time | date: "%Y" %}
{% assign months = "unknown,January,February,March,April,May,June,July,August,September,October,November,December" | split: "," %}
{% for year in (1997..current_year) reversed %}
  {% assign is_publication_for_year = false %}
  {% for pub in site.data.theses %}
    {% if pub.year == year %}
      {% assign is_publication_for_year = true %}
    {% endif %}
  {% endfor %}

  {% if is_publication_for_year %}
    <h3>{{ year }}</h3>
    <ul>
    {% for month in months reversed %}
      {% for pub in site.data.theses %}
        {% assign pub_month_downcase = pub.month | downcase %}
        {% assign month_downcase = month | downcase %}
        {% if pub.year == year and pub_month_downcase == month_downcase %}
          <li>
            {{ pub.author }}<br />
            <strong>"{{ pub.title }}"</strong><br />
            Ph.D. Thesis, UCLA, {% if month != "unknown" %} {{ month }} {% endif %}{{ year }}.<br />
            {% if pub.note %}
            <em>{{ pub.note }}</em><br />
            {% endif %}
            {% if pub.pdf %}
              <a href="data/files/theses/{{ pub.pdf }}" target="_blank"><img src="images/extensions/pdf.png" alt="PDF" /></a>
            {% elsif pub.pdfext %}
              <a href="{{ pub.pdfext }}" target="_blank"><img src="images/extensions/pdf.png" alt="PDF" /></a>
            {% elsif pub.ps %}
              <a href="data/files/theses/{{ pub.ps }}" target="_blank"><img src="images/extensions/ps.png" alt="PS" /></a>
            {% elsif pub.psext %}
              <a href="{{ pub.psext }}" target="_blank"><img src="images/extensions/ps.png" alt="PS" /></a>
            {% endif %}
            {% if pub.pres_pdf %}
              Slides: <a href="data/files/theses/{{ pub.pres_pdf }}" target="_blank"><img src="images/extensions/pdf.png" alt="Presentation (PDF)" /></a>
            {% elsif pub.pres_ppt %}
              Slides: <a href="data/files/theses/{{ pub.pres_ppt }}" target="_blank"><img src="images/extensions/pptx.png" alt="Presentation (PPT)" /></a>
            {% endif %}
          </li>
        {% endif %}
      {% endfor %}
    {% endfor %}
    </ul>
  {% endif %}
{% endfor %}

</div>
