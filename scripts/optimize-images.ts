import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(__dirname, '../public/assets')

async function optimize() {
  console.log("🚀 Démarrage de l'optimisation et normalisation des images...")

  if (!fs.existsSync(assetsDir)) {
    console.error("❌ Dossier assets introuvable.")
    return
  }

  // On liste les dossiers (un dossier par personnage)
  const folders = fs.readdirSync(assetsDir).filter(f => 
    fs.statSync(path.join(assetsDir, f)).isDirectory()
  )

  for (const folder of folders) {
    const folderPath = path.join(assetsDir, folder)
    
    // Le préfixe est le premier mot du dossier (ex: 'amari_davis' -> 'amari')
    const prefix = folder.split('_')[0].toLowerCase()
    
    console.log(`\n📂 Dossier : ${folder} (Préfixe : ${prefix})`)

    // On récupère toutes les images du dossier (support large format)
    // On EXCLUT les fichiers temporaires '_temp_' pour éviter de boucler sur soi-même
    const files = fs.readdirSync(folderPath).filter(f => 
      ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.tiff', '.heic', '.jfif'].includes(path.extname(f).toLowerCase()) &&
      !f.startsWith('_temp_')
    ).sort()

    let counter = 1
    const tempFiles: { tempPath: string; finalPath: string }[] = []

    for (const file of files) {
      const filePath = path.join(folderPath, file)
      const finalName = `${prefix}${counter}.webp`
      const finalPath = path.join(folderPath, finalName)
      
      // On utilise un nom temporaire très spécifique pour la phase de transition
      const tempName = `_normalize_temp_${counter}.webp`
      const tempPath = path.join(folderPath, tempName)

      try {
        // 1. On lit le fichier
        const inputBuffer = fs.readFileSync(filePath)
        
        // 2. On génère le buffer WebP
        const outputBuffer = await sharp(inputBuffer)
          .webp({ quality: 80, effort: 6 })
          .toBuffer()

        // 3. On enregistre en TEMPORAIRE
        fs.writeFileSync(tempPath, outputBuffer)

        // 4. On supprime l'original
        // (Même si l'original s'appelait déjà marcus1.webp, on a notre tempPath en sécurité)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }

        tempFiles.push({ tempPath, finalPath })
        counter++
      } catch (err) {
        console.error(`  ❌ Erreur sur ${file}:`, err instanceof Error ? err.message : err)
      }
    }

    // PHASE 2 : Renommage final une fois que le dossier est purgé des originaux
    for (const item of tempFiles) {
      if (fs.existsSync(item.tempPath)) {
        // Si le fichier destination existe (cas improbable ici), on le dégage
        if (fs.existsSync(item.finalPath)) {
          fs.unlinkSync(item.finalPath)
        }
        fs.renameSync(item.tempPath, item.finalPath)
      }
    }

    console.log(`  ✨ Dossier ${folder} normalisé (${tempFiles.length} images)`)
  }

  console.log("\n✨ Optimisation terminée !")
}

optimize()
