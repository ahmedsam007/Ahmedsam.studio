import { useEffect } from 'react'

const StructuredData = () => {
  useEffect(() => {
    // Website structured data
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Ahmed Sam - UX/UI Designer",
      "url": "https://ahmedsam.studio",
      "description": "Professional UX/UI Designer specializing in web and mobile app design, user experience optimization, and design systems.",
      "author": {
        "@type": "Person",
        "name": "Ahmed Sam",
        "jobTitle": "UX/UI Designer",
        "url": "https://ahmedsam.studio"
      },
      "privacyPolicy": "https://ahmedsam.studio/privacy-policy",
      "cookiePolicy": "https://ahmedsam.studio/cookie-policy"
    }

    // Organization structured data
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Ahmed Sam Studio",
      "url": "https://ahmedsam.studio",
      "logo": "https://ahmedsam.studio/public/images/logos/logo.png",
      "sameAs": [
        "https://linkedin.com/in/ahmedsam",
        "https://dribbble.com/ahmedsam",
        "https://behance.net/ahmedsam"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "hello@ahmedsam.studio"
      },
      "privacyPolicy": "https://ahmedsam.studio/privacy-policy"
    }

    // Create script elements
    const websiteScript = document.createElement('script')
    websiteScript.type = 'application/ld+json'
    websiteScript.textContent = JSON.stringify(websiteData)
    websiteScript.id = 'website-structured-data'

    const organizationScript = document.createElement('script')
    organizationScript.type = 'application/ld+json'
    organizationScript.textContent = JSON.stringify(organizationData)
    organizationScript.id = 'organization-structured-data'

    // Remove existing scripts if they exist
    const existingWebsiteScript = document.getElementById('website-structured-data')
    const existingOrganizationScript = document.getElementById('organization-structured-data')
    
    if (existingWebsiteScript) {
      existingWebsiteScript.remove()
    }
    if (existingOrganizationScript) {
      existingOrganizationScript.remove()
    }

    // Add new scripts
    document.head.appendChild(websiteScript)
    document.head.appendChild(organizationScript)

    // Cleanup function
    return () => {
      const websiteScriptToRemove = document.getElementById('website-structured-data')
      const organizationScriptToRemove = document.getElementById('organization-structured-data')
      
      if (websiteScriptToRemove) {
        websiteScriptToRemove.remove()
      }
      if (organizationScriptToRemove) {
        organizationScriptToRemove.remove()
      }
    }
  }, [])

  return null // This component doesn't render anything
}

export default StructuredData 