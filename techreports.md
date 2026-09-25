---
layout: default
title: Technical Reports
section_id: techreports
---

<div class="full parallax" style="background-image: url(images/banner/banner.jpg); color: var(--color-text-on-dark);">
  <div class="row">
    <div class="large-12 columns">
      {% include section-header.html title="Technical Reports" tagline="" class="big" %}
    </div>
  </div>
  <div class="four spacing"></div>
</div>

<div class="row" style="margin-top: 20px;">
  <h2>COPYRIGHT NOTICE</h2>

  <p>The documents here are provided as a means to ensure timely dissemination of technical work on a noncommercial basis. Copyright and all rights therein are maintained by the authors or by other copyright holders. It is understood that anyone copying the papers from this page will adhere to the terms and constraints invoked by the copyright.</p>

  <hr/>
</div>

<div class="row">

{% assign current_year = site.time | date: "%Y" %}
{% assign months = "unknown,January,February,March,April,May,June,July,August,September,October,November,December" | split: "," %}
{% for year in (1997..current_year) reversed %}
  {% assign is_publication_for_year = false %}
  {% for pub in site.data.publications %}
    {% if pub.type == "techreport" %}
      {% if pub.year == year %}
        {% assign is_publication_for_year = true %}
      {% endif %}
    {% endif %}
  {% endfor %}

  {% if is_publication_for_year %}
    <h3>{{ year }}</h3>
    <ul>
    {% for month in months reversed %}
      {% for pub in site.data.publications %}
        {% assign pub_month_downcase = pub.month | downcase %}
        {% assign month_downcase = month | downcase %}
        {% if pub.year == year and pub_month_downcase == month_downcase %}
          {% if pub.type == "techreport" or pub.type == "internet-draft" %}
            <li>
              {{ pub.authors }}<br />
              <strong>"{{ pub.title }}"</strong><br />
              {% if pub.type == "techreport" %}
                <em>{{ pub.institution }}</em>, Technical Report {{ pub.number }}, {% if month != "unknown" %} {{ month }} {% endif %}{{ year }}.<br />
              {% elsif pub.type == "internet-draft" %}
                <em>{{ pub.group }}</em>, Internet-Draft, {% if month != "unknown" %} {{ month }} {% endif %}{{ year }}.<br />
              {% endif %}
              {% if pub.note %}
                <em>{{ pub.note }}</em><br />
              {% endif %}
              {% if pub.pdf %}
                <a href="data/files/techreports/{{ pub.pdf }}" target="_blank"><img src="images/extensions/pdf.png" alt="PDF" /></a>
              {% elsif pub.pdfext %}
                <a href="{{ pub.pdfext }}" target="_blank"><img src="images/extensions/pdf.png" alt="PDF" /></a>
              {% endif %}
              {% if pub.html %}
                <a href="{{ pub.html }}" target="_blank"><img src="images/extensions/html.png" alt="HTML" /></a>
              {% endif %}
            </li>
          {% endif %}
        {% endif %}
      {% endfor %}
    {% endfor %}
    </ul>
  {% endif %}
{% endfor %}

</div>
