# Sangem Sai Kumar – Portfolio Website
https://portfolio19.z30.web.core.windows.net/
A production-ready personal portfolio website for a DevOps & Cloud Engineer.

## Folder Structure

```
saikumar-portfolio/
├── index.html      ← Main HTML (all sections)
├── style.css       ← Complete stylesheet
├── script.js       ← Animations, typed text, counters, form
└── README.md       ← This file
```

---

## Local Development

Simply open `index.html` in any modern browser — no build tools or dependencies needed.

For a live-reload dev server (optional):
```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Deployment

### GitHub Pages (Free)

1. Create a new GitHub repo, e.g. `saikumar-portfolio`
2. Push all files to the `main` branch
3. Go to **Settings → Pages**
4. Set Source to `Deploy from branch → main → / (root)`
5. Your site will be live at `https://<username>.github.io/saikumar-portfolio/`

```bash
git init
git add .
git commit -m "Initial portfolio release"
git remote add origin https://github.com/<username>/saikumar-portfolio.git
git push -u origin main
```

---

### AWS S3 Static Website Hosting

```bash
# 1. Create bucket (bucket name must be unique globally)
aws s3 mb s3://saikumar-portfolio --region ap-south-1

# 2. Enable static website hosting
aws s3 website s3://saikumar-portfolio/ \
  --index-document index.html \
  --error-document index.html

# 3. Set public-read policy
aws s3api put-bucket-policy \
  --bucket saikumar-portfolio \
  --policy '{
    "Version":"2012-10-17",
    "Statement":[{
      "Effect":"Allow",
      "Principal":"*",
      "Action":"s3:GetObject",
      "Resource":"arn:aws:s3:::saikumar-portfolio/*"
    }]
  }'

# 4. Upload files
aws s3 sync . s3://saikumar-portfolio/ \
  --exclude ".git/*" --exclude "README.md"

# URL: http://saikumar-portfolio.s3-website.ap-south-1.amazonaws.com
```

For a custom domain + HTTPS, put AWS CloudFront in front of the S3 bucket.

---

### Azure Storage Static Website

```bash
# 1. Create a resource group and storage account
az group create --name portfolio-rg --location centralindia
az storage account create \
  --name saikumarportfolio \
  --resource-group portfolio-rg \
  --sku Standard_LRS \
  --kind StorageV2

# 2. Enable static website
az storage blob service-properties update \
  --account-name saikumarportfolio \
  --static-website \
  --index-document index.html \
  --404-document index.html

# 3. Upload files
az storage blob upload-batch \
  --account-name saikumarportfolio \
  --source . \
  --destination '$web' \
  --pattern "*.html" "*.css" "*.js"

# 4. Get the website URL
az storage account show \
  --name saikumarportfolio \
  --resource-group portfolio-rg \
  --query "primaryEndpoints.web" --output tsv
```

---

## Customisation Checklist

- [ ] Replace the resume download `href="#"` in the hero with a real PDF link
- [ ] Add a real GitHub profile URL in the contact section
- [ ] Upload a profile photo and replace the avatar placeholder SVG with an `<img>` tag
- [ ] Update the contact form `action` to connect to a backend or email service (Formspree, EmailJS)
- [ ] Add Google Analytics or Microsoft Clarity for visitor tracking

## Performance Tips

- Compress images with Squoosh or TinyPNG before uploading
- Enable Gzip/Brotli compression on your hosting provider
- Add a `Cache-Control: max-age=31536000` header for CSS/JS assets
- Consider hosting fonts locally to eliminate the Google Fonts network dependency
